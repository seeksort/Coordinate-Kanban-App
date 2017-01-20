module.exports = {
    entry: "./app/app.js",
    output: {
        path: __dirname,
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {
              test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/, 
              query: {
                presets: ['es2015', 'react']
              }
            }
        ]
    },
    devtool: "eval-source-map"
};