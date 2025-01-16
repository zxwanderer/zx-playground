const path = require('path');
const webpack = require('webpack'); // Добавляем импорт webpack

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production', // Режим разработки
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