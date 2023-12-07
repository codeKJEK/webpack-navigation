const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const jsPages = [
  "main",
  "navigation",
  "index",
  "about",
  "service",
  "review",
  "contact",
  "faq",
];
const htmlPages = ["index", "about", "service", "review", "contact", "faq"];

module.exports = {
  mode: "development",
  entry: jsPages.reduce((config, page) => {
    config[page] = `./src/js/${page}.js`;
    return config;
  }, {}),
  output: {
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: "source-map", // "eval-source-map
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [].concat(
    htmlPages.map(
      (page) =>
        new HTMLWebpackPlugin({
          inject: true,
          filename: `${page}.html`,
          template: `./src/${page}.html`,
          chunks: ["navigation", page],
        })
    )
  ),
};
