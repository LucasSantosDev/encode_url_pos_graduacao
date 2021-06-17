const Sequelize = require("sequelize");
const database = require("../database/db");

const Urls = database.define("urls", {
  id: {
    type: Sequelize.STRING,
    autoIncrement: false,
    allowNull: false,
    primaryKey: true
  },
  base_url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  code_url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  complete_url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    field: "created_at"
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "updated_at"
  }
});

module.exports = Urls;
