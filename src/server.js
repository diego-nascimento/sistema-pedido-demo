const server = require('./app');
require('dotenv').config();
server.listen(process.env.PORT || 8081, () => {
  console.log('server running on port 8081');
});
