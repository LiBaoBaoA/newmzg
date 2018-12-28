var gulp = require('gulp');
var webserver = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var json = require('./json/data.json');
var clean = require('gulp-clean-css');




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