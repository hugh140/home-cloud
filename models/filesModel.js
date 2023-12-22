const fs = require("fs");
const createError = require("http-errors");
const { join } = require("path");

class FilesModel {
  static uploadFiles(files, path) {
    const storagePath = join(__dirname, "..", "public", "storage", path);

    if (!fs.existsSync(storagePath))
      fs.mkdirSync(storagePath, { recursive: true });

    if (!files?.length) files = [files];

    for (const file of files) {
      file.mv(storagePath + `/${file.name}`);
    }

    return { message: "Archivos guardados correctamente", ok: true };
  }

  static createDir(path) {
    const storagePath = join(__dirname, "..", "public", "storage", path);
    fs.mkdirSync(storagePath, { recursive: true });

    return { message: "Directorio creado correctamente", ok: true };
  }

  static getFiles(path, next) {
    const storagePath = join(__dirname, "..", "public", "storage", path);
    if (!fs.existsSync(storagePath))
      next(
        createError(
          404,
          "El directorio requerido no se encuentra o ha sido eliminado."
        )
      );

    const files = fs.readdirSync(storagePath);
    const pathSplit = path.split("\\\\");
    const filesInfo = [];
    if (pathSplit.length > 1)
      filesInfo.push({
        name: "../",
        url: new URL(
          join(
            process.env.SERVER_URL,
            "files",
            `?path=${pathSplit.slice(0, -1).join("\\\\")}`
          )
        ),
        type: "back",
      });
    files.forEach((file) => {
      if (fs.lstatSync(storagePath + `/${file}`).isDirectory())
        filesInfo.push({
          name: file,
          url: new URL(
            join(process.env.SERVER_URL, "files", `?path=${path}/${file}`)
          ),
          type: "directory",
        });
      else
        filesInfo.push({
          name: file,
          url: join(process.env.SERVER_URL, "storage", path, file),
          path: join(path, file),
          type: "file",
        });
    });

    filesInfo.sort((a, b) => {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      return 0;
    });

    return filesInfo;
  }
}
module.exports = FilesModel;
