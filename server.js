#! /usr/bin/env node
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var app = express();
var compiler = webpack(config);
var fs = require('fs');
var marked = require('marked');

var slidesFile = path.resolve(__dirname, process.argv[2]);
var slidesHTML = marked(fs.readFileSync(slidesFile, 'utf8'));
var slides = slidesHTML.split('<hr>');

var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.render('index', { slides: JSON.stringify(slides) });
});

app.listen(5000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:5000');
});
