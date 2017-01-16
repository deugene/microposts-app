const Micropost = require('../models').Micropost;

module.exports = {
  create(req, res, next) {
    Micropost
      .create(req.body, { fields: Object.keys(req.body) })
      .then(micropost => res.json({ data: micropost }))
      .catch(next);
  },
  update(req, res, next) {
    Micropost
      .findById(req.params.micropostId)
      .then(micropost => {
        if (!micropost) { throw new Error('Micropost Not Found'); }
        micropost
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedMicropost => res.json({ data: updatedMicropost }))
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
          .then(() => res.json({ data: micropost }))
          .catch(next);
      })
      .catch(next);
  }
}
