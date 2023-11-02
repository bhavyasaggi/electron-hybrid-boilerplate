const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
  // JavaScript: Use Babel to transpile JavaScript files
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
    },
  },
  // Handling styles
  {
    test: /\.(sass|scss|css)$/,
    use: [
      {
        loader:
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          importLoaders: 2,
          sourceMap: false,
          modules: false,
        },
      },
      { loader: "postcss-loader" },
      { loader: "sass-loader" },
    ],
  },
  {
    test: /\.less$/i,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: "css-loader",
      },
      {
        // Used to load the url loaders present in blueprintjs (/resources/icons)
        loader: "resolve-url-loader",
      },
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            // Used to evaluate css function (https://github.com/palantir/blueprint/issues/5011).
            math: "always",
          },
        },
      },
    ],
  },
  // Handling assets
  {
    test: /\.(jpe?g|svg|png|gif|ico)(\?v=\d+\.\d+\.\d+)?$/i,
    type: "asset/resource",
    generator: {
      filename: "assets/[name][ext]",
    },
  },
  {
    test: /\.(eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
    type: "asset/resource",
    generator: {
      filename: "fonts/[name][ext]",
    },
  },
];
