
var gulp    = require('gulp');
var useref  = require('gulp-useref');
var clean   = require('gulp-clean');
var ghPages = require('gulp-gh-pages');
var bs      = require('browser-sync');
 
gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
     .pipe(clean());
});

gulp.task('vendor', function () {
  return gulp.src('index.html')
     .pipe(useref())
     .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('images/**')
     .pipe(gulp.dest('dist/images'));
});

gulp.task('build', ['vendor', 'images']);

gulp.task('deploy', [ 'build' ], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('serve', function() {
  startBrowsersync({
    port: 3000,
    open: false,
    injectChanges: false,
    server: {
        baseDir: './',
        files: [
            'index.html'
        ]
    }
  });
});

function startBrowsersync (config) {
  var bsIns = bs.create();
  bsIns.init(config);
  bsIns.reload();
}

gulp.task('default', ['build']);
