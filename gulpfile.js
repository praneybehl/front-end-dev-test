const gulp = require('gulp');
const sass = require('gulp-sass');
const flatten = require('gulp-flatten');
const autoprefixer = require('gulp-autoprefixer');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const webserver = require('gulp-webserver');
const concat = require('gulp-concat');
const mocha = require("gulp-mocha");
const gUtil = require("gulp-util");


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
    //run test the first time it starts watching
    gulp.run('test');
    gulp.watch('./app/**/*.scss', ['sass']);
    gulp.watch('./app/**/*.handlebars', ['hbs']);
    gulp.watch('./app/**/*.js', ['js']);
    // watch tests and run test when test change
    gulp.watch('./test/*.js', ['test']);
});


gulp.task('default', ['lint', 'sass', 'hbs', 'js'], function() {
    // run tests
    gulp.run('test');
});

// added task to run mocha tests
gulp.task('test', function(){
    return gulp.src(["test/*.js"], {read:false})
        .pipe(mocha({reporter: 'list'}))
        .on('error',gUtil.log);
});

gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js', 'gulpfile.js'])
    .pipe(jshint({
        esversion: 6
    }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('hbs', function () {
    // Sample menu items passed as data to the TopNav components
    var templateData = {
        theme1MenuItems: ["Home","Explore","Plan","Get in touch","Sponsorship","Events"],
        theme2MenuItems: ["Home","Explore","Plan","A Long Title That Pushes 2 lines","Sponsorship","Events"]
    },
    options = {
        batch : ['./app/TopNav/hbs/']
    };

    return gulp.src('app/Global/hbs/TopNavExample.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename('top-nav-example.html'))
        .pipe(gulp.dest('dist'));
});

// added task to combine all js files in load order and save them as app.js in dist
gulp.task('js', function() {
    return gulp.src(["./app/Global/js/Utils.js",
        "./node_modules/verge/verge.js",
        "./libs/evennav/evennav.js",
        "./app/TopNav/js/TopNav.js"])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/'));
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
