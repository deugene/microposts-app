'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    profile: {
      allowNull: false,
      type: DataTypes.STRING
    },
    admin: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        User.hasMany(models.Micropost, {
          foreignKey: 'userId',
          as: 'microposts'
        });
        User.hasMany(models.Comment, {
          foreignKey: 'userId',
          as: 'comments'
        });
      }
    }
  });
  return User;
};
