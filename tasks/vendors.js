var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var expect = require('gulp-expect-file');
var minifyCSS = require('gulp-cssnano');

var files = [
  'node_modules/angular/angular.min.js',
  'node_modules/angular-sanitize/angular-sanitize.min.js',
  'node_modules/angular-aria/angular-aria.js',
  'node_modules/angular-animate/angular-animate.js',
  'node_modules/angular-material/angular-material.min.js',
  'node_modules/moment/min/moment.min.js',
];  

var styles = [
  'node_modules/angular-material/angular-material.min.css'
];

gulp.task('build-vendors', ['build-vendors-css'], function () {
  gulp.src(files)
    .pipe(expect({ errorOnFailure: true }, files))
    .pipe(gulpif(/[.]js$/, concat('vendors.js')))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('build-vendors-css', function(){
  gulp.src(styles)
    .pipe(expect({ errorOnFailure: true }, styles))
    .pipe(gulpif(/[.]css$/, concat('vendors.css')))
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/assets/css/'));
});












