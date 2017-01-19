'use strict';

const Micropost = require('../models').Micropost;

module.exports = {
  create(req, res, next) {
    Micropost
      .create(req.body, { fields: Object.keys(req.body) })
      .then(micropost => res.json({ data: micropost }))
      .catch(next);
  },
  update(req, res, next) {
    Micropost.findById(req.params.micropostId)
      .then(micropost => {
        if (!micropost) { throw new Error('Micropost Not Found'); }
        return micropost.update(req.body, { fields: Object.keys(req.body) })
      })
      .then(updatedMicropost => res.json({ data: updatedMicropost }))
      .catch(next);
  },
  destroy(req, res, next) {
    let deletedMicropost;
    Micropost
      .findById(req.params.micropostId)
      .then(micropost => {
        if (!micropost) { throw new Error('Micropost Not Found'); }
        deletedMicropost = micropost;
        return micropost.destroy()
      })
      .then(() => res.json({ data: deletedMicropost }))
      .catch(next);
  }
}
