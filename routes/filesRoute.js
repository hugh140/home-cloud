var express = require("express");
const FilesController = require("../controllers/filesController");
var router = express.Router();

router.post("/", FilesController.uploadFiles);
router.post("/dir", FilesController.createDir);
router.get("/", FilesController.getFiles)
router.delete("/", FilesController.deleteDir)

module.exports = router;
