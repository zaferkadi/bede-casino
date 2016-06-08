'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './app/main.jsx',
    output: {
        path: path.resolve(__dirname, "app/dist"),
        publicPath: "/app/dist/",
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port: 3333
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        },/*{
            test: /\.css$/,
            loader:"css-loader!autoprefixer-loader" //ExtractTextPlugin.extract('style', 'css')
        },*/ {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style", "css!autoprefixer-loader!sass")
        }, {
            test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
            loader: 'url'
        }]
    },
    plugins: [new ExtractTextPlugin("style.css")/*,
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })*/]
};