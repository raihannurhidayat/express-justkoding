"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          id: 1,
          name: "IPhone",
          description: "ini iphone mantap",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: 2,
          name: "Laptop",
          description: "ini laptop mantap",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: 3,
          name: "TV",
          description: "ini TV mantap",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {})
  },
};
