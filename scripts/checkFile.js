const { imgExts, videoExts } = require("./extList");

function checkFileType(fileName) {
  const ext = fileName.split(".").at(-1);

  if (imgExts.find((e) => e === ext)) return "image";
  else if (videoExts.find((e) => e === ext)) return "video";
  else return "file";
}

module.exports = checkFileType;
