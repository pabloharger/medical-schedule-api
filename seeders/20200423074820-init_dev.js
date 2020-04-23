'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      firstName: 'Pablo',
      lastName: 'Harger',
      email: 'pabloharger@gmail.com',
      password: '$2a$10$F8R0aljAzY5uIeE504Ybwe33OA.nLu8k3L2saYNp4HUOaYkk6Od06',
      activated: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true }).then(() => {
      return queryInterface.bulkInsert('doctors', [{
        firstName: 'Bill',
        lastName: 'Gates',
        createdAt: new Date(),
        updatedAt: new Date()
      }], { returning: true })
    }).then(() => {
      return queryInterface.bulkInsert('patients', [{
        firstName: 'Carl',
        lastName: 'Johnson',
        createdAt: new Date(),
        updatedAt: new Date()
      }], { returning: true })
    })

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
}
