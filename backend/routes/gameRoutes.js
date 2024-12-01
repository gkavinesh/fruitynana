const express = require("express");
const router = express.Router();
const { getGameData } = require("../controllers/gameController");

// Route to fetch game data
router.get("/", getGameData);

module.exports = router;
