const express = require('express');
const router = express.Router();
const { getStats } = require('../../controller/statscontroller/statscontroller');

router.get('/stats', getStats);

module.exports = router;
