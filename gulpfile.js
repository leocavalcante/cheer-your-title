var gulp   = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename')
 
gulp.task('compress', function() {
  return gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(rename('cheerleader.min.js'))
    .pipe(gulp.dest('dist'));
});