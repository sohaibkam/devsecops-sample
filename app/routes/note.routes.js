const express = require('express');
const router = express.Router();
const noteCtrl = require('../controllers/note.controller');

router.post('/', noteCtrl.create);
router.get('/', noteCtrl.list);

module.exports = router;
