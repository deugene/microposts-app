const models = require('../models');

const User = models.User;
const Micropost = models.Micropost;
const Comment = models.Comment;

module.exports = {
  create(req, res, next) {
    User
      .create(req.body, { fields: Object.keys(req.body) })
      .then(user => res.json({ data: user }))
      .catch(next);
  },
  all(req, res, next) {
    User
      .findAll({
        attributes: [ 'id' ]
      })
      .then(users => {
        const count = users.length;
        User
          .findAll({
            offset: req.body.offset,
            limit: req.body.limit
          })
          .then(users => {
            res.json({
              count: count,
              data: users
            });
          })
          .catch(next);
      })
      .catch(next);
  },
  findById(req, res, next) {
    User
      .findById(req.params.userId, {
        include:[
          {
            model: User,
            as: 'followers'
          },
          {
            model: User,
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
    User
      .findById(req.params.userId)
      .then(user => {
        if (!user) { throw new Error('User Not Found'); }
        user
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedUser => res.json({ data: updatedUser }))
          .catch(next);
      })
      .catch(next);
  },
  destroy(req, res, next) {
    User
      .findById(req.params.userId)
      .then(user => {
        if (!user) { throw new Error('User Not Found'); }
        user.destroy()
          .then(() => res.json({ data: user }))
          .catch(next);
      })
      .catch(next);
  },
  feed(req, res, next) {
    User
      .findById(req.params.userId, {
        include: [{
          model: User,
          as: 'followedUsers'
        }]
      })
      .then(user => {
        if (!user) { throw new Error('User Not Found'); }
        const followedUsers = user.followedUsers.concat(user).map(u => u.id);
        Micropost.findAll({
          where: {
            userId: {
              $in: followedUsers
            }
          },
          attributes: [ 'id' ]
        })
        .then(feed => {
          const count = feed.length;
          Micropost.findAll({
            where: {
              userId: {
                $in: followedUsers
              },
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
          .then(feed => {
            res.json({
              count: count,
              data: feed || []
            });
          })
          .catch(next);
        })
        .catch(next);
      })
      .catch(next);
  }
}
