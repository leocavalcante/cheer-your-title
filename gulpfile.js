var gulp    = require('gulp');
var gutil   = require('gulp-util');
var webpack = require('webpack');

gulp.task('webpack', function() {
  webpack({
    context: __dirname + '/lib',
    entry: './cheerleader',
    output: {
      path: __dirname + '/dist',
      filename: 'cheerleader.min.js',
      library: 'cheerYourTitle'
    },
    module: {
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
      ]
    }
  }, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString());
  });
});