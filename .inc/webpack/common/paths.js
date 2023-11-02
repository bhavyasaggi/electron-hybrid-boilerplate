const path = require("path");

const root = process.cwd();

module.exports = {
  // Source files
  assets: path.resolve(root, "assets"),
  src: path.resolve(root, "src"),
  appSrc: path.resolve(root, "src/electron/renderer/index.jsx"),
  appTemplate: path.resolve(root, "src/template/index.html"),
  appBuild: path.resolve(root, "build"),
  electronMain: path.resolve(root, "src/electron/main/index.js"),
  electronPreload: path.resolve(root, "src/electron/preload/index.js"),
  electronRenderer: path.resolve(root, "src/electron/renderer/index.jsx"),
  electronTemplate: path.resolve(root, "src/template/index.html"),
  electronBuild: path.resolve(root, "dist"),
};
