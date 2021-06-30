const app = require('./index');
const { PORT_API_LISTEN } = require('./constants');

app.listen(PORT_API_LISTEN, function () {
  console.log(`LISTEN >>> ${PORT_API_LISTEN}`)
});