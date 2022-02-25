'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', [
      {
        CustomerName: 'Mary',
        CustomerPhone: 7666000000,
        GrandTotal: 1545,
       OrderStatus: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CustomerName: 'Priya',
        CustomerPhone: 7660000000,
        GrandTotal: 1545,
        OrderStatus: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
