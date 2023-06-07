'use strict';

const movies = require('../data/movie.json')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    movies.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
      if (element.id) {
        delete element.id
      }
    })
    return queryInterface.bulkInsert('Movies', movies, {})
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Movies', null, {})
  }
};
