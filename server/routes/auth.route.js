const express = require('express');
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/auth/login')
  .post(authCtrl.login)

router.route('/auth/verify-token')
  .get(authCtrl.requireSignin, authCtrl.verifyToken)

module.exports = router;
