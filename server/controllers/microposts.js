const Micropost = require('../models').Micropost;

module.exports = {
  create(req, res, next) {
    Micropost
      .create(req.body, { fields: Object.keys(req.body) })
      .then(micropost => res.json(micropost))
      .catch(next);
  },
  update(req, res, next) {
    Micropost
      .findById(req.params.micropostId)
      .then(micropost => {
        if (!micropost) { throw new Error('Micropost Not Found'); }
        micropost
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedMicropost => res.json(updatedMicropost))
          .catch(next);
      })
      .catch(next);
  },
  destroy(req, res, next) {
    Micropost
      .findById(req.params.micropostId)
      .then(micropost => {
        if (!micropost) { throw new Error('Micropost Not Found'); }
        micropost.destroy()
          .then(() => res.json(micropost))
          .catch(next);
      })
      .catch(next);
  },
  findAll(req, res, next) {
    Micropost
      .findAll({
        where: {
          userId: {
            in: req.body.followedUsers
          }
        },
        include: [{
          model: Comment,
          as: 'comments',
        }]
      })
      .catch(next);
  }
}
