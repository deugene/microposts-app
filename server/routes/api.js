const router = require('express').Router();

const controllers = require('../controllers');

// users
router.get('/users', controllers.users.list);
router.post('/users', controllers.users.create);
router.get('/users/:userId', controllers.users.findById);
router.put('/users/:userId', controllers.users.update);

// microposts
router.post(
  '/users/:userId/microposts',
  controllers.microposts.create
);

//comments
router.post(
  '/users/:userId/microposts/:micropostId/comments',
  controllers.comments.create
);

module.exports = router;
