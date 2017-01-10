const Relationship = require('../models').Relationship;

module.exports = {
  create(req, res, next) {
    Relationship
      .create(req.body, { fields: Object.keys(req.body) })
      .then(relationship => res.json(relationship))
      .catch(next);
  },
  destroy(req, res, next) {
    Relationship
      .findById(req.params.relationshipId)
      .then(relationship => {
        if (!relationship) { throw new Error('Relationship Not Found'); }
        relationship.destroy()
          .then(() => res.json(relationship))
          .catch(next);
      })
      .catch(next);
  }
}
