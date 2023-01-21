const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = (env, argv = {}) => ({
  entry: {
    bundle: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-[fullhash].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin({ verbose: true }),
    new MiniCssExtractPlugin({
      filename: argv.mode === 'development' ? '[name].css' : '[name].[hash].css',
      chunkFilename: argv.mode === 'development' ? '[id].css' : '[id].[hash].css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      app: path.resolve(__dirname, 'src/app'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      data: path.resolve(__dirname, 'src/data'),
      domain: path.resolve(__dirname, 'src/domain'),
      i18n: path.resolve(__dirname, 'src/i18n'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: argv.mode === 'development' ? '[local]--[hash:base64:5]' : '[hash:base64]',
              },
              sourceMap: argv.mode === 'development',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: argv.mode === 'development',
            },
          },
        ],
      },
    ],
  },
  devtool: argv.mode === 'development' ? 'inline-source-map' : false,
  devServer: {
    static: path.resolve(__dirname, 'public'),
    open: false,
    port: 3000,
    historyApiFallback: true,
  },
})
