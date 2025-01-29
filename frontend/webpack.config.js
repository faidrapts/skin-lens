const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Your entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../'),
    '@ui': path.resolve(__dirname, 'src/components/ui'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
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
        test: /\.css$/, // Handle .css files
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader',   // Resolves CSS imports and URL paths
          'postcss-loader', // Processes CSS with PostCSS (including Tailwind)
        ],
      },
    ],
},
resolve: {
    extensions: ['.js', '.jsx'], // Resolve .js and .jsx extensions
},
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true, // This is critical for SPAs to handle routing correctly
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        usePolling: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Point to your HTML file in the `src` directory
    }),
  ],
};
