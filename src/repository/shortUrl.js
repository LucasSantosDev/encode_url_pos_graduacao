// const db = require("../database/db");
const uuid = require("uuid");
const model = require("../model/urls");
const generateCode = require("../utils/generateCode");
const { Op } = require('sequelize');
const { BASE_URL } = require('../constants');

/**
 * @module ShortURLRepository
 */

/**
 * Check in database if code_url already exists
 * @param {string} code_url 
 * @returns {bool}
 */
const checkCodeExists = async (code_url) => {
  const codeExists = await model.findOne({
    where: { code_url: code_url }
  })

  return codeExists?.id ? true : false;
};

const create = async () => {
  try {
    let code_url = "";

    do {
      code_url = generateCode();
    } while ((await checkCodeExists(code_url)));

    await model.create({
      id: uuid.v4(),
      base_url: BASE_URL,
      code_url,
      complete_url: `${BASE_URL}${code_url}`,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

const listAll = async () => {
  const res = await model.findAll();

  return res;
};

const listShortURLByDate = async (date) => {
  const res = await model.findAll({
    where: {
      createdAt: {
        [Op.gt]: date
      }
    }
  });

  return res;
};

const getShortURLById = async (id) => {
  const res = await model.findByPk(id)

  return res;
};

const getShortURLByCode = async (code_url) => {
  const res = await model.findAll({
    where: { code_url }
  })

  return res;
};

module.exports = {
  listAll,
  listShortURLByDate,
  getShortURLById,
  getShortURLByCode,
  create
};