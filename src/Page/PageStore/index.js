if (process.env.NODE_ENV === 'production') {
  module.exports = require('./PageStore.prod');
} else {
  module.exports = require('./PageStore.dev');
}
