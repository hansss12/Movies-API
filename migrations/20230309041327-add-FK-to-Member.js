'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    return queryInterface.addColumn('Users', 'MemberId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Members',
        key: 'id'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    return queryInterface.removeColumn('Users', 'MemberId', {});
  }
};
