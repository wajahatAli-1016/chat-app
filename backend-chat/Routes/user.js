const express = require('express');
const router = express.Router();
const UserController = require('../Controller/user');
const auth = require('../Authentication/auth');
router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.get('/searchedMember',auth,UserController.searchMember)
router.post('/logout',auth,UserController.logout)

module.exports = router;