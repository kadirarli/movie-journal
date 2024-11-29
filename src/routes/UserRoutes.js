const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/profile', usersController.authenticate, usersController.getProfile);
router.delete('/', usersController.authenticate, usersController.deleteUser);

module.exports = router;