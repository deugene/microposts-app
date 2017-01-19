'use strict';

const Comment = require('../models').Comment;

module.exports = {
  create(req, res, next) {
    Comment.create(req.body, { fields: Object.keys(req.body) })
      .then(comment => res.json({ data: comment }))
      .catch(next);
  },
  update(req, res, next) {
    Comment.findById(req.params.commentId)
      .then(comment => {
        if (!comment) { throw new Error('Comment Not Found'); }
        return comment.update(req.body, { fields: Object.keys(req.body) })
      })
      .then(updatedComment => res.json({ data: updatedComment }))
      .catch(next);
  },
  destroy(req, res, next) {
    let deletedComment;
    Comment.findById(req.params.commentId)
      .then(comment => {
        if (!comment) { throw new Error('Comment Not Found'); }
        deletedComment = comment;
        return comment.destroy()
      })
      .then(() => res.json({ data: deletedComment }))
      .catch(next);
  }
}
