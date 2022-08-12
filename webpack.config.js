const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env.local"),
});

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.resolve(__dirname, "./public"),
  },
};
