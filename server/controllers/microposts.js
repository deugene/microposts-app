const Micropost = require('../models').Micropost;

module.exports = {
  create(req, res, next) {
    Micropost.create({
      title: req.body.title,
      body: req.body.body,
      micropostId: req.params.micropostId
    })
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
  delete(req, res, next) {
    Micropost
      .findById(req.params.micropostId)
      .then(micropost => {
        if (!micropost) { throw new Error('Micropost Not Found'); }
        micropost.destroy()
          .then(() => res.json({ micropost: micropost, deleted: true }))
          .catch(next);
      })
      .catch(next);
  }
}
