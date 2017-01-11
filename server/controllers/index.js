const users = require('./users');
const microposts = require('./microposts');
const comments = require('./comments');
const relationships = require('./relationships');
const auth0 = require('./auth0');

module.exports = {
  users,
  microposts,
  comments,
  relationships,
  auth0
}
