const path = require('path');

module.exports = {
  entry: './src/index.js',  // path to our input file
  output: {
    filename: 'bundle.js',  // output bundle file name
    path: path.resolve(__dirname, 'static/frontend'),  // path to our Django static directory
    clean: true,  // removes old bundles
  },
  devtool: 'eval-source-map',  // enable dev server to display correct file names
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/, // Add a loader for CSS files
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource'
      }
    ],
  },
  watch: true
};