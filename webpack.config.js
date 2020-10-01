const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'jspower.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'jspower',
    libraryTarget: 'umd2',
    globalObject: 'this',
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
        'node_modules': path.join(__dirname, 'node_modules'),
    }
  }
};

