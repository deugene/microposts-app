const config = require('../app.config');
const request = require('request');

module.exports = {
  patchUserProfile(req, res, next) {
    if(req.body.id === req.params.userId) {
      const patchUser = request({
        url: `https://deugene.eu.auth0.com/api/v2/users/${req.body.id}`,
        method: 'PATCH',
        body: req.body,
        json: true,
        auth: {
          bearer: config.managmentToken
        }
      })
      patchUser.on('response', response => {
        if (response.status === '200') {
          res.json(req.body);
        } else {
          next(new Error(`${response.status}`));
        }
      });
      patchUser.on('error', err => next(err));
    } else {
      next(new Error('Invalid User'));
    }
  }
}
