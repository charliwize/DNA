const path = require('path');
const webpack = require("webpack");
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    index: [
      'webpack-hot-middleware/client',
     './src/client/_app.tsx'
    ]
  },
  watch: true,
  serve: {},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin({ test: /^(?!.*(hot)).*/ })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      components: path.resolve(__dirname, 'src/client/components/'),
      assets: path.resolve(__dirname, 'src/client/assets/'),
      types: path.resolve(__dirname, 'src/client/types/'),
      pages: path.resolve(__dirname, 'src/client/pages/'),
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },
  devtool: 'source-map',
};