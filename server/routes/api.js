const router = require('express').Router();

const controllers = require('../controllers');

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
