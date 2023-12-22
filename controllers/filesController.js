const createError = require("http-errors");
const FilesModel = require("../models/filesModel");

class FilesController {
  static uploadFiles(req, res, next) {
    const files = req.files?.cloud;
    let path = req.query.path;

    if (!files)
      next(
        createError(400, "Se necesita subir al menos un archivo al servidor.")
      );

    if (!path) path = ".";
    else {
      if (path.split("-").some((dir) => dir === ".."))
        next(
          createError(
            400,
            "No es necesario que tu dirección retroceda entre los directorios usando caracteres no permitidos."
          )
        );
      path = path.replaceAll("-", "/");
    }

    const response = FilesModel.uploadFiles(files, path);
    res.json(response);
  }
}
module.exports = FilesController;
