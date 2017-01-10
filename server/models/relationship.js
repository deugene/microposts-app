'use strict';
module.exports = function(sequelize, DataTypes) {
  var Relationship = sequelize.define('Relationship', { }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Relationship.belongsTo(models.User, {
          foreignKey: 'followerId',
          onDelete: 'CASCADE'
        });
        Relationship.belongsTo(models.User, {
          foreignKey: 'followedId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Relationship;
};
