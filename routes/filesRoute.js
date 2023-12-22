var express = require("express");
const FilesController = require("../controllers/filesController");
var router = express.Router();

router.post("/", FilesController.uploadFiles);

module.exports = router;
