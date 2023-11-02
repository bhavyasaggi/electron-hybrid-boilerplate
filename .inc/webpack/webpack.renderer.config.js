const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const plugins = require("./common/webpack.plugins");
const rules = require("./common/webpack.rules");

module.exports = {
  module: {
    rules: [...rules],
  },
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      MAIN_WINDOW_BUILD_MODE: JSON.stringify("renderer"),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  devtool: "source-map",
  optimization: {
    nodeEnv: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // We don't want to minimize the files - electron-quick-start/* and show-me/*
        exclude: /static/,
      }),
      new CssMinimizerPlugin(),
      "...",
    ],
  },
};
