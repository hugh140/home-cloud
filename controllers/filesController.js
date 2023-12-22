const createError = require("http-errors");
const FilesModel = require("../models/filesModel");
const { join } = require("path");

class FilesController {
  static uploadFiles(req, res, next) {
    const files = req.files?.cloud;
    let path = req.query.path;

    if (!files)
      next(
        createError(400, "Se necesita subir al menos un archivo al servidor.")
      );

    if (!path) path = "./";
    else {
      if (path.split("-").some((dir) => dir === ".."))
        next(
          createError(
            400,
            "No es necesario que tu dirección retroceda entre los directorios usando caracteres no permitidos."
          )
        );

    }

    const response = FilesModel.uploadFiles(files, path);
    res.json(response);
  }

  static createDir(req, res, next) {
    const dirName = req.query.name;
    let path = req.query.path;

    if (!dirName)
      next(
        createError(400, "Se necesita el nombre de la carpeta para crearla.")
      );

    if (!path) path = "";
    else if (path.split("-").some((dir) => dir === ".."))
      next(
        createError(
          400,
          "No es necesario que tu dirección retroceda entre los directorios usando caracteres no permitidos."
        )
      );
    path += `/${dirName}`;

    const response = FilesModel.createDir(path);
    res.json(response);
  }

  static getFiles(req, res, next) {
    let path = req.query.path;

    const reducedPath = join(path || " ");
    if (
      !path ||
      reducedPath === "." ||
      reducedPath === ".\\" ||
      reducedPath === "\\"
    )
      path = "./";
    else if (path.split("-").some((dir) => dir === ".."))
      next(
        createError(
          400,
          "No es necesario que tu dirección retroceda entre los directorios usando caracteres no permitidos."
        )
      );

    const response = FilesModel.getFiles(path, next);
    res.send(response);
  }
}
module.exports = FilesController;
