const express = require('express');
const router = express.Router();

const {getRandomPuzzle} = require('../controllers/puzzleController');

router.route('/puzzle/random').get(getRandomPuzzle);

module.exports = router;