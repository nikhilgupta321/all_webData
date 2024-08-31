const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config'); // Adjust the path as needed

try {
  const Journals = sequelize.define(
    'journals',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      sort: {
        type: DataTypes.INTEGER,
      },
      category: {
        type: DataTypes.STRING(100),
      },
      short_name: {
        type: DataTypes.STRING(255),
      },
      full_name: {
        type: DataTypes.STRING(255),
      },
      domain: {
        type: DataTypes.STRING(255),
      },
      email: {
        type: DataTypes.STRING(255),
      },
      publisher: {
        type: DataTypes.STRING(255),
      },
      samplefile: {
        type: DataTypes.STRING(255),
      },
      editor_name: {
        type: DataTypes.STRING(255),
      },
      editor_profile: {
        type: DataTypes.STRING(255),
      },
      scopus: {
        type: DataTypes.ENUM('yes', 'no'),
      },
      scopusTid: {
        type: DataTypes.STRING(255),
      },
      wosTid: {
        type: DataTypes.STRING(255),
      },
      wos: {
        type: DataTypes.ENUM('yes', 'no'),
      },
      doaj: {
        type: DataTypes.ENUM('yes', 'no'),
      },
      embase: {
        type: DataTypes.ENUM('yes', 'no'),
      },
      road: {
        type: DataTypes.ENUM('yes', 'no'),
      },
      indexcopernicus: {
        type: DataTypes.ENUM('yes', 'no'),
      },
      citefactor: {
        type: DataTypes.ENUM('yes', 'no'),
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_by: {
        type: DataTypes.STRING(100),
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'journals',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  );

  module.exports = Journals;
} catch (error) {
  console.error('Error defining Sequelize model:', error);
}
