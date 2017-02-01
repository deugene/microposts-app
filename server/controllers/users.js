'use strict';

const models = require('../models');
const User = models.User;
const Micropost = models.Micropost;
const Comment = models.Comment;

module.exports = {
  all(req, res, next) {
    User.findAndCountAll({
      offset: req.body.offset,
      limit: req.body.limit
    })
      .then(users => {
        res.json({
          count: users.count,
          data: users.rows
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

  create(req, res, next) {
    User.findOne()
      .then(user => {
        const newUser = req.body;
        if (!user) { newUser.admin = true; }
        return User.create(newUser, { fields: Object.keys(newUser) })
      })
      .then(newUser => res.json({ data: newUser }))
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
    let lastAdmin;
    User.findAndCountAll({
      where: { admin: true },
      limit: 2,
      attributes: [ 'id' ],
    })
      .then(admins => {
        if (admins.count < 2) { lastAdmin = true; }
        return User.findById(req.params.userId)
      })
      .then(user => {
        if (!user) { throw new Error('User Not Found'); }
        if (user.admin && lastAdmin) { throw new Error('User is the last admin'); }
        deletedUser = user;
        return user.destroy()
      })
      .then(() => res.json({ data: deletedUser }))
      .catch(next);
  },

  feed(req, res, next) {
    User.findById(req.params.userId, {
      include: [{
        model: User,
        attributes: [ 'id' ],
        as: 'followedUsers'
      }]
    })
      .then(user => {
        if (!user) { throw new Error('User Not Found'); }
        const followedUsers = user.followedUsers.concat(user).map(u => u.id);
        return Micropost.findAndCountAll({
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
        });
      })
      .then(feed => {
        res.json({
          count: feed.count,
          data: feed.rows
        });
      })
      .catch(next);
  }
}
