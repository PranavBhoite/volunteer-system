const express = require('express');
const router = express.Router();
const usercontroller = require('../../controller/usercontroller/userdatacontrolller');
const { checkUserApproval } = require('../../middleware/userAuth');

router.get('/display/:id' , usercontroller.displayUser) ;
router.put('/update/:id' , checkUserApproval, usercontroller.updateUser) ;
router.get('/allusers', usercontroller.getAllUsers);

module.exports = router;
