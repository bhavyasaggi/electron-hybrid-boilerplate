// Use this to generate CSR from 'src/app/index.jsx'
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const paths = require("./common/paths");
const plugins = require("./common/webpack.plugins");
const rules = require("./common/webpack.rules");

const webpackConfig = {
  mode: "production",
  target: "web",
  devtool: false,
  entry: paths.appSrc,
  output: {
    path: paths.appBuild,
    publicPath: "/",
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [...rules],
  },
  plugins: [
    ...plugins,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.assets,
          to: "rawAssets",
          globOptions: {
            ignore: ["*.DS_Store", ".*"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new webpack.DefinePlugin({
      MAIN_WINDOW_BUILD_MODE: JSON.stringify("app"),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      title: "Remote App",
      template: paths.appTemplate,
      filename: "index.html", // output file
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
    ],
    runtimeChunk: {
      name: "runtime",
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  node: {
    __dirname: false,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

module.exports = webpackConfig;
