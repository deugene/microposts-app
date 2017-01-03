const Micropost = require('../models').Micropost;

module.exports = {
  create(req, res, next) {
    Micropost.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.params.userId
    })
    .then(micropost => res.json(micropost))
    .catch(next);
  }
}
