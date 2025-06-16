const express = require('express');
const router = express.Router();
const usercontroller = require('../../controller/usercontroller/userdatacontrolller');


router.get('/display/:id' , usercontroller.displayEvent) ;
router.put('/update/:id' , usercontroller.updateEvent) ;
router.get('/allusers', usercontroller.getAllUsers);

module.exports = router;
