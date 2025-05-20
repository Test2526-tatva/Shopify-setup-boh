module.exports = {
  entry: {
    'bundle': './src/js/main.js',
    // 'collection-animatiow/src/js/archive-anim.js',
  },
  output: {
    path: __dirname + '/assets',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
