var express = require("express");
const FilesController = require("../controllers/filesController");
var router = express.Router();

router.post("/", FilesController.uploadFiles);
router.post("/dir", FilesController.createDir);
router.get("/", FilesController.getFiles)

module.exports = router;
