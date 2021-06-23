const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  const { BUILD_ENV } = env;

  return {
    entry: ['babel-polyfill', './src/index.jsx'],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'eslint-loader',
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[ext]',
              },
            },
            {
              loader: 'img-loader',
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['./src'],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          BUILD_ENV: JSON.stringify(BUILD_ENV),
        },
      }),
      new HtmlWebPackPlugin({
        template: 'src/index.html',
        filename: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new CopyWebpackPlugin([
        {
          from: './src/assets/img',
          to: './img',
        },
        {
          from: './public',
          to: './public',
        },
      ]),
    ],
  };
};
