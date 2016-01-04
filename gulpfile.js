var gulp    = require('gulp');
var rename  = require('gulp-rename');
var gutil   = require('gulp-util');
var webpack = require('webpack');
var uglify  = require('gulp-uglify');
 
gulp.task('compress', function() {
  return gulp.src('build/*.js')
    .pipe(uglify())
    .pipe(rename('cheerleader.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack', function() {
  webpack({
    context: __dirname + '/lib',
    entry: './cheerleader',
    output: {
      path: __dirname + '/build',
      filename: 'cheerleader.bundle.js',
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

gulp.task('default', ['webpack', 'compress']);