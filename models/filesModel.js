const fs = require("fs");
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
}
module.exports = FilesModel;
