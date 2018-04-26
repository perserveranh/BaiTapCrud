var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

var paths = {
  node_modules: './node_modules/',
  libs_js: './src/js/libs/',
  libs_css: './src/css/libs/'
}

gulp.task('copy:libs', function() {
  // bootstrap
  gulp.src(paths.node_modules + 'bootstrap/dist/js/bootstrap.min.js')
      .pipe(gulp.dest(paths.libs_js));
  gulp.src(paths.node_modules + 'bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest(paths.libs_css));

  // jquery
  gulp.src(paths.node_modules + 'jquery/dist/jquery.min.js')
      .pipe(gulp.dest(paths.libs_js));

  // popper.js
  gulp.src(paths.node_modules + 'popper.js/dist/popper.min.js')
      .pipe(gulp.dest(paths.libs_js));
});


// use default task to launch Browsersync and watch JS files
gulp.task('default', function () {
  browserSync.init({
      server: {
        baseDir: './src'
      }
  });

  gulp.watch('src/**/*.js', function () {
      browserSync.reload()
  });
  gulp.watch('src/*.html', function () {
      browserSync.reload()
  });
  gulp.watch('src/**/*.css', function () {
      browserSync.reload()
  });
});
