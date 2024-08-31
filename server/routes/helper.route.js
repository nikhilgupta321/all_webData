const express = require('express');
// import adminCtrl from '../controllers/admin.controller'
const authCtrl = require('../controllers/auth.controller')


const router = express.Router()

router.route('/api/admin')
  .get(authCtrl.requireSignin)

module.exports = router;