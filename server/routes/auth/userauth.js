const express = require('express');
const router = express.Router();
const { registerUser , loginUser, getActiveUsers, softDeleteUser, updateUser } = require('../../controller/authcontroller/usercontroller');


router.post('/register', registerUser);
router.post('/login', loginUser);






module.exports = router;
