const express = require('express');
const router = express.Router();
const usercontroller = require('../../controller/usercontroller/userdatacontrolller');


router.get('/display/:id' , usercontroller.displayUser) ;
router.put('/update/:id' , usercontroller.updateUser) ;
router.get('/allusers', usercontroller.getAllUsers);

module.exports = router;
