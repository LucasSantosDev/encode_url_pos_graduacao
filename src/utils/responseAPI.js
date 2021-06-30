const responseAPI = (message, data = {}, error = {}) => {
  const response = { 'message': message, 'data': data };

  if (Object.keys(error).length !== 0) {
    response.error = error;
  }

  return response;
};

module.exports = responseAPI;