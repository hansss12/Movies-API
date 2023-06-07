'use strict';

const Members = require('../data/member.json')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    Members.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
      if (element.id) {
        delete element.id
      }
    })
    return queryInterface.bulkInsert('Members', Members, {})
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Members', null, {})
  }
};
