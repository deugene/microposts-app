const Comment = require('../models').Comment;

module.exports = {
  create(req, res, next) {
    Comment
      .create(req.body, { fields: Object.keys(req.body) })
      .then(comment => res.json(comment))
      .catch(next);
  },
  update(req, res, next) {
    Comment
      .findById(req.params.commentId)
      .then(comment => {
        if (!comment) { throw new Error('Comment Not Found'); }
        comment
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedComment => res.json(updatedComment))
          .catch(next);
      })
      .catch(next);
  },
  delete(req, res, next) {
    Comment
      .findById(req.params.commentId)
      .then(comment => {
        if (!comment) { throw new Error('Comment Not Found'); }
        comment.destroy()
          .then(() => res.json({ comment: comment, deleted: true }))
          .catch(next);
      })
      .catch(next);
  }
}
