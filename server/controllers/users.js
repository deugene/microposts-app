'use strict';

const models = require('../models');
const User = models.User;
const Micropost = models.Micropost;
const Comment = models.Comment;

module.exports = {
  create(req, res, next) {
    User.findAll({ offset: 0, limit: 1 })
      .then(users => {
        const newUser = req.body;
        if (users.length === 0) { newUser.admin = true; }
        return User.create(newUser, { fields: Object.keys(newUser) })
      })
      .then(newUser => res.json({ data: newUser }))
      .catch(next);
  },
  all(req, res, next) {
    let count;
    User.findAll({ attributes: [ 'id' ] })
      .then(users => {
        count = users.length;
        const findOpts = {
          offset: req.body.offset,
          limit: req.body.limit
        };
        return User.findAll(findOpts)
      })
      .then(users => {
        res.json({
          count: count,
          data: users
        });
      })
      .catch(next);
  },
  findById(req, res, next) {
    User.findById(req.params.userId, {
      include:[
        {
          model: User,
          attributes: [ 'id', 'firstName', 'lastName', 'picture' ],
          as: 'followers'
        },
        {
          model: User,
          attributes: [ 'id', 'firstName', 'lastName', 'picture' ],
          as: 'followedUsers'
        }
      ]
    })
    .then(user => {
      if (!user) { throw new Error('User Not Found'); }
      res.json({ data: user });
    })
    .catch(next);
  },
  update(req, res, next) {
    User.findById(req.params.userId)
      .then(user => {
        if (!user) { throw new Error('User Not Found'); }
        return user.update(req.body, { fields: Object.keys(req.body) })
      })
      .then(updatedUser => res.json({ data: updatedUser }))
      .catch(next);
  },
  destroy(req, res, next) {
    let deletedUser;
    User.findAll({
      where: { admin: true },
      offset: 0,
      limit: 2,
      attributes: [ 'id' ],
    })
      .then(admins => {
        if (admins.length < 2) { throw new Error('User is the last admin'); }
        return User.findById(req.params.userId)
      })
      .then(user => {
        if (!user) { throw new Error('User Not Found'); }
        deletedUser = user;
        return user.destroy()
      })
      .then(() => res.json({ data: deletedUser }))
      .catch(next);
  },
  feed(req, res, next) {
    let followedUsers;
    let count;
    User.findById(req.params.userId, {
      include: [{
        model: User,
        attributes: [ 'id' ],
        as: 'followedUsers'
      }]
    })
      .then(user => {
        if (!user) { throw new Error('User Not Found'); }
        followedUsers = user.followedUsers.concat(user).map(u => u.id);
        return Micropost.findAll({
          where: {
            userId: { $in: followedUsers }
          },
          attributes: [ 'id' ]
        });
      })
      .then(feed => {
        count = feed.length;
        return Micropost.findAll({
          where: {
            userId: { $in: followedUsers },
          },
          offset: req.body.offset,
          limit: req.body.limit,
          order: [[ 'id', 'DESC' ]],
          include: [{
            model: Comment,
            as: 'comments'
          },
          {
            model: User,
            attributes: [ 'id', 'firstName', 'lastName', 'picture' ],
            foreignKey: 'userId',
            as: 'author'
          }]
        })
      })
      .then(feed => {
        res.json({
          count: count,
          data: feed || []
        });
      })
      .catch(next);
  }
}
