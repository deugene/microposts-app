const config = require('../app.config');
const request = require('request');

module.exports = {
  patchUserProfile(req, res, next) {
    if(req.body.id === req.params.userId) {
      delete req.body.id
      request({
        url: `https://deugene.eu.auth0.com/api/v2/users/${req.params.userId}`,
        method: 'PATCH',
        body: JSON.stringify(req.body),
        headers: {
          'Authorization': 'Bearer ' + config.managmentToken,
          'Content-Type': 'application/json'
        }
      }, (err, response) => {
        if (err) {
          next(err);
        } else if (response) {
          if (response.statusCode === 200) {
            res.json(req.body);
          } else {
            next(new Error(`${response.statusCode}: ${response.statusMessage}`));
          }
        }
      });
    } else {
      next(new Error('Invalid User'));
    }
  },
  changePass(req, res, next) {
    if(req.body.user_id === req.params.userId) {
      request({
        url: `https://deugene.eu.auth0.com/api/v2/tickets/password-change`,
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
          'Authorization': 'Bearer ' + config.managmentToken,
          'Content-Type': 'application/json'
        }
      })
      .on('error', err => next(err))
      .pipe(res);
    } else {
      next(new Error('Invalid User'));
    }
  }
}
