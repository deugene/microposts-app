'use strict';

const Relationship = require('../models').Relationship;

module.exports = {
  create(req, res, next) {
    Relationship.create(req.body, { fields: Object.keys(req.body) })
      .then(relationship => res.json(relationship))
      .catch(next);
  },
  destroy(req, res, next) {
    let deletedRelationship;
    Relationship.findOne({
      where: {
        followerId: req.params.userId,
        followedId: req.params.otherId
      }
    })
      .then(relationship => {
        if (!relationship) { throw new Error('Relationship Not Found'); }
        deletedRelationship = relationship;
        return relationship.destroy()
      })
      .then(() => res.json(deletedRelationship))
      .catch(next);
  }
}
