'use strict';
module.exports = function(sequelize, DataTypes) {
  var Micropost = sequelize.define('Micropost', {
    body: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        Micropost.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          as: 'author'
        });

        Micropost.hasMany(models.Comment, {
          foreignKey: 'micropostId',
          as: 'comments'
        });
      }
    }
  });
  return Micropost;
};
