var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');

var paths = {
  scripts: {
    ours: [
      'source/js/**/*.js',
      '!source/js/lib/**'
    ],
    lib:[
      'bower_modules/jquery/dist/jquery.min.js',
      'source/js/lib/**/*.js'
    ]
  },
  styles: {
    ourswatch:['source/less/**/*.less'],
    ours:['source/less/main.less'],
    lib:['source/less/lib/**/*.css']
  },
  images: 'source/img/**',
  html:{
    index:['source/index.html'],
    templates:['source/templates/**/*.html'],
  },
  fonts:['source/assets/fonts/**'],
  misc:['source/assets/misc/**']
};

gulp.task('scripts-ours', function() {
  return gulp.src(paths.scripts.ours)
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});
gulp.task('scripts-lib', function() {
  return gulp.src(paths.scripts.lib)
    .pipe(concat("lib.js"))
    .pipe(gulp.dest('build/js'));
});
gulp.task('styles-ours', function () {
  return gulp.src(paths.styles.ours)
    .pipe(less())
    .pipe(gulp.dest('build/css'));
});
gulp.task('styles-lib', function () {
  return gulp.src(paths.styles.lib)
    .pipe(concat("lib.css"))
    .pipe(gulp.dest('build/css'));
});
// Copy all static assets
gulp.task('copy-img', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest('build/img'));
});
gulp.task('copy-index', function() {
  return gulp.src(paths.html.index)
    .pipe(gulp.dest('build'));
});
gulp.task('copy-fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('build/fonts'));
});
gulp.task('copy-misc', function() {
  return gulp.src(paths.misc)
    .pipe(gulp.dest('build/misc'));
});
gulp.task('watch', function () {
  gulp.watch(paths.scripts.ours, ['scripts-ours']);
  gulp.watch(paths.scripts.lib, ['scripts-lib']);
  gulp.watch(paths.styles.ourswatch, ['styles-ours']);
  gulp.watch(paths.styles.lib, ['styles-lib']);
  gulp.watch(paths.images, ['copy-img']);
  gulp.watch(paths.html.index, ['copy-index']);
  gulp.watch(paths.fonts, ['copy-fonts']);
  gulp.watch(paths.misc, ['copy-misc']);
});
// The default task (called when you run `gulp`)
gulp.task('default', [
  'scripts-lib', 
  'scripts-ours', 
  'styles-lib', 
  'styles-ours', 
  'copy-img', 
  'copy-index', 
  'copy-fonts', 
  'copy-misc',
  'watch'
]);