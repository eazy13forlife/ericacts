const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const pathObject = require("path");

module.exports = {
  entry: ["core-js/stable", "regenerator-runtime/runtime", "./source/index.js"],
  plugins: [new CleanWebpackPlugin()],
  output: {
    path: pathObject.resolve(__dirname, "./public/scripts"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["transform-object-rest-spread"],
            },
          },
        ],
      },

      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000,
              name: "../../public/scripts/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "../../public/scripts/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: pathObject.resolve(__dirname, "./public"),
    publicPath: "./scripts",
  },
  devtool: "source-map",
};
