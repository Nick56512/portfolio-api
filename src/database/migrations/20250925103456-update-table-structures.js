'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('images', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('images', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.changeColumn('images', 'fileName', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('images', 'filePath', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('images', 'portfolioId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'portfolios',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.changeColumn('comments', 'content', {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    await queryInterface.changeColumn('comments', 'imageId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'images',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('images', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('images', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('images', 'fileName', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('images', 'filePath', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('images', 'portfolioId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('comments', 'content', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('comments', 'imageId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
