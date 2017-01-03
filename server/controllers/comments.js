const Comment = require('../models').Comment;

module.exports = {
  create(req, res, next) {
    Comment.create({
      body: req.body.body,
      userId: req.params.userId,
      micropostId: req.params.micropostId
    })
    .then(comment => res.json(comment))
    .catch(next);
  }
}
