const express = require('express');
const router = express.Router();
const { registerUser , loginUser, getActiveUsers, softDeleteUser, updateUser } = require('../../controller/authcontroller/usercontroller');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/users", getActiveUsers);
router.put("/delete/:id", softDeleteUser);
router.put("/update/:id", updateUser);



module.exports = router;
