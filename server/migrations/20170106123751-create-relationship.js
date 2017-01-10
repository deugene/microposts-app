'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Relationships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      followerId: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      followedId: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    })
    .then(function() {
      return queryInterface.addIndex('Relationships', [ 'followerId' ]);
    })
    .then(function() {
      return queryInterface.addIndex('Relationships', [ 'followedId' ]);
    })
    .then(function() {
      return queryInterface.addIndex(
        'Relationships',
        [ 'followerId', 'followedId' ],
        { indicesType: 'UNIQUE' }
      );
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Relationships');
  }
};
