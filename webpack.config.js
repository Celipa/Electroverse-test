const path = require('path');

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'main.jsx'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9000
  }
};