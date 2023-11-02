const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
  // new CleanWebpackPlugin(),
  process.env.NODE_ENV === "production"
    ? new MiniCssExtractPlugin({
        filename: "./css/[name].css",
        chunkFilename: "[id].css",
        // https://github.com/webpack-contrib/mini-css-extract-plugin#experimentalUseImportModule
        experimentalUseImportModule: false,
      })
    : null,
  new webpack.DefinePlugin(
    Object.keys(process.env).reduce((acc, envKey) => {
      acc[`process.env.${envKey}`] = JSON.stringify(process.env[envKey]);
      return acc;
    }, {})
  ),
].filter((plugin) => plugin);
