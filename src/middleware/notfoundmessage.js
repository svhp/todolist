const path = require('path');

const notfoundmessage = (req, res, next) => {
  res.status(404).redirect('/login');
}

module.exports = notfoundmessage;