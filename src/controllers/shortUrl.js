const responseAPI = require("../utils/responseAPI");
const shortUrlReposiroty = require("../repository/shortUrl");

/**
 * @module ShortURLController
 */

/**
 * List all items
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @return {JSON.Response}
 */
const index = async (req, res) => {
  let objList = {};

  const filterDate = req.params.filterDate;

  if (filterDate) {
    const dateFormat = new Date(filterDate);

    objList = await shortUrlReposiroty.listShortURLByDate(dateFormat);
  } else {
    objList = await shortUrlReposiroty.listAll();
  }

  return res.json(responseAPI('success', objList));
}

const store = async (req, res) => {
  // const {  } = req.body; // GET PARAMETERS

  const objStore = await shortUrlReposiroty.create(); // SEND PARAMETERS

  return res.json(responseAPI('success', objStore));
}

const show = async (req, res) => {
  const objGet = await shortUrlReposiroty.getShortURLById(req.params.id);

  return res.json(responseAPI('success', objGet));
}

const getByCode = async (req, res) => {
  const objGet = await shortUrlReposiroty.getShortURLByCode(req.params.code);

  return res.json(responseAPI('success', objGet));
}

module.exports = {
  index,
  store,
  show,
  getByCode,
};