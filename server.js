'use strict';
const path = require('path');
const express = require('express');

const app = express();

const TARGET = process.env.npm_lifecycle_event;

if(TARGET=== 'dev'){
  const config = require('./webpack.config');
  const webpack = require('webpack');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static('static'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
})
