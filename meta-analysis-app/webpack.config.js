const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // Adding PostCSS for Tailwind
        use: ['style-loader', 'css-loader', 'postcss-loader'], 
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // alias: {
    //   '@': path.resolve(__dirname, 'src'),  // Map '@' to 'src'
    // },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
  },
};
