const db = require("./database/db");
const uuid = require("uuid");
const model = require("./model/urls");
const generateCode = require("./utils/generateCode");
const { Op } = require('sequelize');

const BASE_URL = "https://bit.io/";

const checkCodeExists = async (code_url) => {
  const codeExists = await model.findOne({
    where: {
      code_url: code_url
    }
  })

  return codeExists?.id ? true : false;
};

const shortURL = async () => {
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

const getShortURLById = async (id) => {
  const res = await model.findByPk(id)

  return JSON.parse(JSON.stringify(res));
};

const listShortURLByDate = async (date) => {
  const res = await model.findAll({
    where: {
      createdAt: {
        [Op.gt]: date
      }
    }
  });

  return JSON.parse(JSON.stringify(res));
};

const getShortURLByCode = async (code_url) => {
  const res = await model.findAll({
    where: {
      code_url
    }
  })

  return JSON.parse(JSON.stringify(res));
};

const listAll = async () => {
  const res = await model.findAll();

  return JSON.parse(JSON.stringify(res));
};

(async () => {
  await db.sync();

  const create = await shortURL();
  const list_urls = await listShortURLByDate(new Date('2021, 6, 14'));
  const url_by_id = await getShortURLById(list_urls[0].id);
  const url_by_code = await getShortURLByCode(list_urls[0].code_url);
  const list_all = await listAll();

  console.log('CREATE >> ', create ? 'OK' : 'FAIL');
  console.log('LIST >> ', list_urls);
  console.log('SHOW >> ', url_by_id);
  console.log('BY_CODE >> ', url_by_code);
  console.log('ALL >> ', list_all);
})();