
const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const paths = require("./common/paths");
const plugins = require("./common/webpack.plugins");
const rules = require("./common/webpack.rules");

module.exports = {
  entry: paths.electronMain,
  module: {
    rules: [
      ...rules,
      // Add support for native node modules
      {
        test: /native_modules\/.+\.node$/,
        use: "node-loader",
      },
      {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: "@vercel/webpack-asset-relocator-loader",
          options: {
            outputAssetBase: "native_modules",
          },
        },
      },
    ],
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      MAIN_WINDOW_BUILD_MODE: JSON.stringify("main"),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
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
