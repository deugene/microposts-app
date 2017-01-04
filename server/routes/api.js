const router = require('express').Router();

const cors = require('cors');
const jwt = require('express-jwt');

const controllers = require('../controllers');

// auth
let auth0ClientSecret;
let auth0ClientId;

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const config = require('../app.config');
  auth0ClientId = config.clientId;
  auth0ClientSecret = config.clientSecret;
} else {
  auth0ClientId = process.env.AUTH0_CLIENT_ID;
  auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET;
}

router.use(cors());

const authCheck = jwt({
  secret: new Buffer(auth0ClientSecret, 'base64'),
  audience: auth0ClientId
});

router.all ('/*', authCheck);

// users
router.get('/users', controllers.users.all);
router.post('/users', controllers.users.create);
router.get('/users/:userId', controllers.users.one);
router.put('/users/:userId', controllers.users.update);
router.delete('/users/:userId', controllers.users.delete);

// microposts
router.post(
  '/users/:userId/microposts',
  controllers.microposts.create
);
router.put(
  '/users/:userId/microposts/:micropostId',
  controllers.microposts.update
);
router.delete(
  '/users/:userId/microposts/:micropostId',
  controllers.microposts.delete
);

//comments
router.post(
  '/users/:userId/microposts/:micropostId/comments',
  controllers.comments.create
);
router.put(
  '/users/:userId/microposts/:micropostId/comments/:commentId',
  controllers.comments.update
);
router.delete(
  '/users/:userId/microposts/:micropostId/comments/:commentId',
  controllers.comments.delete
);

module.exports = router;
