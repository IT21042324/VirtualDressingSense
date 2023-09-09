const router = require("express").Router();

const {recommondation} = require("../controllers/algorithm")

router.get('/recommondation',recommondation);

module.exports = router;