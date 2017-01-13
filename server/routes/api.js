const router = require('express').Router();

const cors = require('cors');
const jwt = require('express-jwt');

const controllers = require('../controllers');

// auth
const auth0ClientId = process.env.AUTH0_CLIENT_ID;
const auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET;

router.use(cors());

const authCheck = jwt({
  secret: auth0ClientSecret,
  audience: auth0ClientId
});

router.all ('/*', authCheck);

// users
router.get('/users', controllers.users.all);
router.post('/users', controllers.users.create);
router.get('/users/:userId', controllers.users.findById);
router.put('/users/:userId', controllers.users.update);
router.delete('/users/:userId', controllers.users.destroy);
router.get('/users/:userId/feed', controllers.users.feed);

// auth0 user update
router.post('/auth/:userId/update-user-profile', controllers.auth0.patchUserProfile);
router.post('/auth/:userId/change-pass', controllers.auth0.changePass);

// microposts
router.post(
  '/microposts',
  controllers.microposts.create
);
router.put(
  '/microposts/:micropostId',
  controllers.microposts.update
);
router.delete(
  '/microposts/:micropostId',
  controllers.microposts.destroy
);

// comments
router.post(
  '/comments',
  controllers.comments.create
);
router.put(
  '/comments/:commentId',
  controllers.comments.update
);
router.delete(
  '/comments/:commentId',
  controllers.comments.destroy
);

// relationships
router.post(
  '/relationships',
  controllers.relationships.create
);
router.delete(
  '/relationships/:userId/:otherId',
  controllers.relationships.destroy
);

module.exports = router;
