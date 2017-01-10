const models = require('../models');

const User = models.User;
const Micropost = models.Micropost;
const Comment = models.Comment;
const Relationship = models.Relationship;

module.exports = {
  create(req, res, next) {
    User
      .create(req.body, { fields: Object.keys(req.body) })
      .then(user => res.json(user))
      .catch(next);
  },
  all(req, res, next) {
    User
      .all()
      .then(users => res.json(users))
      .catch(next);
  },
  findById(req, res, next) {
    User
      .findById(req.params.userId, {
        include:[
          {
            model: Micropost,
            as: 'microposts',
            include: [{
              model: Comment,
              as: 'comments'
            }]
          },
          {
            model: User,
            through: {
              model: Relationship,
              foreignKey: 'followerId'
            },
            as: 'followers'
          },
          {
            model: User,
            through: {
              model: Relationship,
              foreignKey: 'followedId'
            },
            as: 'followedUsers'
          }
        ]
      })
      .then(user => {
        if (!user) { throw new Error('User Not Found'); }
        res.json(user);
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
          .then(updatedUser => res.json(updatedUser))
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
          .then(() => res.json(user))
          .catch(next);
      })
      .catch(next);
  }
}
