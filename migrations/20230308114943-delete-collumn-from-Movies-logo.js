'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    return queryInterface.removeColumn('Movies', 'logo', {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    return queryInterface.addColumn('Movies', 'logo', {});
  }
};
