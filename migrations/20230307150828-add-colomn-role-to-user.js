'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    return queryInterface.addColumn('Users', 'role', {
      type: Sequelize.DataTypes.STRING
    });
  },

  down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    return queryInterface.removeColumn('Users', 'role', {});
  }
};
