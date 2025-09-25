'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('images', 'fileSize');
    await queryInterface.removeColumn('images', 'mimeType');
    await queryInterface.removeColumn('comments', 'authorName');
    await queryInterface.removeColumn('comments', 'authorEmail');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('images', 'fileSize', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('images', 'mimeType', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('comments', 'authorName', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('comments', 'authorEmail', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
