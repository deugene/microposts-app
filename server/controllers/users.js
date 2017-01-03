const models = require('../models');

const User = models.User;
const Micropost = models.Micropost;
const Comment = models.Comment;

module.exports = {
  create(req, res, next) {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      profile: req.body.profile,
      admin: req.body.admin
    })
    .then(user => res.json(user))
    .catch(next);
  },
  list(req, res, next) {
    User
      .all()
      .then(users => res.json(users))
      .catch(next);
  },
  findById(req, res, next) {
    User
      .findById(req.params.userId, {
        include: [{
          model: Micropost,
          as: 'microposts',
          include: [{
            model: Comment,
            as: 'comments'
          }]
        }]
      })
      .then(user => {
        if (!user) { throw new Error('User Not Found'); }
        res.json(user);
      })
      .catch(next);
  },
  update(req, res, next) {
    User
      .findById(req.params.userId, {
        include: [{
          model: Micropost,
          as: 'microposts',
          include: [{
            model: Comment,
            as: 'comments'
          }]
        }]
      })
      .then(user => {
        if (!user) { throw new Error('User Not Found'); }
        user
          .update(req.body, { fields: Object.keys(req.body ) })
          .then(updatedUser => res.json(updatedUser))
          .catch(next);
      })
      .catch(next);
  }
}
