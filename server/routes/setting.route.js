const express = require('express');
const authCtrl = require('../controllers/auth.controller')
const settingsCtrl = require('../controllers/setting.controller')

const router = express.Router()

router.route('/settings')
  .get(settingsCtrl.list)
  .post(authCtrl.requireSignin, settingsCtrl.update)

module.exports = router;