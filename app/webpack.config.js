const path = require('path');

const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ],
  mode: 'development', // Режим разработки
  devtool: 'inline-source-map', // Карты исходников для дебага
  devServer: { // Настройки devServer для HMR
    static: [
      './dist',
      {
        directory: path.join(__dirname, 'static/jsspeccy'),
        publicPath: '/jsspeccy',
      },
    ],
    hot: true,
    open: true,
    port: 8080,
  }
  // watch: true, // Включаем режим слежения за изменениями файлов
};