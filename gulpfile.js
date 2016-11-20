const gulp = require('gulp');
const sass = require('gulp-sass');
const flatten = require('gulp-flatten');
const autoprefixer = require('gulp-autoprefixer');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const webserver = require('gulp-webserver');

 
gulp.task('sass', function () {
  return gulp.src('./app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(flatten())
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./app/**/*.scss', ['sass']);
  gulp.watch('./app/**/*.handlebars', ['hbs']);
  gulp.watch('./app/**/*.js', ['js']);
});


gulp.task('default', ['lint', 'sass', 'hbs', 'js'], function() {
    // Add tests here
});

gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js', 'gulpfile.js'])
    .pipe(jshint({
        esversion: 6
    }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('hbs', function () {
    var templateData = {
        
    },
    options = {
        batch : ['./app/TopNav/hbs/']
    };
 
    return gulp.src('app/Global/hbs/TopNavExample.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename('top-nav-example.html'))
        .pipe(gulp.dest('dist'));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: {
          enable: true,
          path: "dist"
      },
      open: true,
      port: 4000
    }));
});

// TODO: combine JS files into single file 'app.js'. See TopNav.js for dependency list