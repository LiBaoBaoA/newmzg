var gulp = require('gulp');
var webserver = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var json = require('./json/data.json');
var clean = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

//压缩css
gulp.task('clean', function() {
    return gulp.src('./css/*.css')
        .pipe(clean())
        .pipe(gulp.dest('./css/'))
})

//压缩js
gulp.task('uglify', function() {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./js/'))
})

//编译scss
gulp.task('sass', function() {
    return gulp.src('./scss/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/index.css'))
})

//编译
gulp.task('watch', function() {
    return gulp.watch('./scss/index.scss', gulp.series('sass'))
})

//主
gulp.task('webser', function() {
    return gulp.src('./')
        .pipe(webserver({
            port: 8000,
            open: true,
            livereload: true,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                if (pathname == '/favicon.ico') {
                    res.end('')
                    return;
                }
                if (pathname == '/') {
                    res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
                } else if (pathname == '/list') {
                    res.end(JSON.stringify({ code: 1, data: json }))
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, pathname)));
                }
            }
        }))
})