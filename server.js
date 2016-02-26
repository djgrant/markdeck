#! /usr/bin/env node
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var app = express();
var compiler = webpack(config);
var fs = require('fs');
var marked = require('marked');

var slidesFile = path.resolve(process.cwd(), process.argv[2]);
var slidesHTML = fs.readFileSync(slidesFile, 'utf8');

var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('*', function(req, res) {
  res.render(path.join(__dirname, './views/index'),
  { slidesHTML: JSON.stringify(slidesHTML) });
});

app.listen(5000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:5000');
});
