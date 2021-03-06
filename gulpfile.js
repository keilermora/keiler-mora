'use strict';

const gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  bytediff = require('gulp-bytediff'),
  cssnano = require('cssnano'),
  concat = require('gulp-concat'),
  del = require('del'),
  gutil = require('gulp-util'),
  htmlmin = require('gulp-htmlmin'),
  postcss = require('gulp-postcss'),
  processhtml = require('gulp-processhtml'),
  pump = require('pump'),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  strip = require('gulp-strip-comments'),
  uglify = require('gulp-uglify'),
  uglifycss = require('gulp-uglifycss');

function calculateDataSavings(data) {
  let message = '';
  if(data.savings === 0) {
    message = `${data.fileName} sin cambios.`;
  } else {
    const startSize = (data.startSize / 1024).toFixed(3);
    const endSize = (data.endSize / 1024).toFixed(3);
    const percent = (100 - data.percent * 100).toFixed(2);
    const difference = (data.savings > 0) ? 'disminuyó' : 'aumentó';
    message = `${data.fileName} ${difference} ${percent}% (De ${startSize}kb a ${endSize}kb)`;
  }
  return message;
}

const styles = [
  './node_modules/font-awesome/css/font-awesome.min.css',
  './node_modules/bootstrap/dist/css/bootstrap.min.css',
  './node_modules/swiper/dist/css/swiper.min.css',
  './src/styles/*.css'
];

const scripts = [
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/bootstrap/dist/js/bootstrap.min.js',
  './node_modules/swiper/dist/js/swiper.min.js',
  './node_modules/gsap/src/minified/TweenLite.min.js',
  './node_modules/gsap/src/minified/easing/EasePack.min.js',
  './node_modules/gsap/src/minified/plugins/CSSPlugin.min.js',
  './node_modules/gsap/src/minified/plugins/ScrollToPlugin.min.js',
  './src/scripts/index.js'
];

const fonts = [
  './node_modules/font-awesome/fonts/**/*'
];

/**
 * Construir el proyecto
 */
gulp.task('build', function() {
  runSequence(
    'clean-build', // Limpiar directorio dist
    'convert-sass', // Copiar y convertir SASS a CSS
    'compress-css', // Comprimir y copiar CSS
    'compress-js', // Comprimir y copiar JS
    'compress-images', // Comprimir y copiar imágenes
    'process-html', // Procesar y copiar html
    'copy-fonts', // Copiar fuentes
    'copy-main-files' // Copiar archivos que no requieren ser procesados
  );
});

/**
 * Limpiar directorio dist
 */
gulp.task('clean-build', function() {
  del('./dist');
});

/**
 * Copiar y convertir SASS a CSS
 */
gulp.task('convert-sass', function(cb) {
  pump([
    gulp.src('./src/styles/sass/style.scss'),
    sass().on('error', sass.logError),
    gulp.dest('./src/styles')], cb);
});

/**
 * Comprimir y copiar CSS
 */
gulp.task('compress-css', function(cb) {
  pump([
    gulp.src(styles),
    concat('style.min.css'),
    bytediff.start(),
    postcss([
      autoprefixer(),
      cssnano()
    ]),
    sourcemaps.init(),
    uglifycss(),
    sourcemaps.write('/'),
    bytediff.stop(function(data) { return calculateDataSavings(data); }),
    gulp.dest('./dist/styles/')], cb);
});

/**
 * Comprimir y copiar JS
 */
gulp.task('compress-js', function() {
  pump([
    gulp.src(scripts),
    concat('script.min.js'),
    sourcemaps.init(),
    bytediff.start(),
    uglify(),
    strip(),
    bytediff.stop(function(data) { return calculateDataSavings(data); }),
    sourcemaps.write('/'),
    gulp.dest('./dist/scripts/')]);
});

/**
 * Comprimir y copiar imágenes
 */
gulp.task('compress-images', function(cb) {
  pump([
    gulp.src(['./src/images/*', '!./src/images/*.svg']),
    gulp.dest('./dist/images')], cb);
});

gulp.task('copy-fonts', function(cb) {
  pump([gulp.src(fonts), gulp.dest('./dist/fonts')], cb);
});

/**
 * Procesar y copiar html
 */
gulp.task('process-html', function(cb) {
  pump([
    gulp.src(['./src/index.html']),
    processhtml(),
    htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    }),
    gulp.dest('./dist')], cb);
});

/**
 * Copiar los archivos que no requieren ser procesados
 */
gulp.task('copy-main-files', function() {
  pump([
    gulp.src(['./src/locales/*.json']),
    gulp.dest('./dist/locales')]);

  pump([
    gulp.src(['./src/sounds/*.wav']),
    gulp.dest('./dist/sounds')]);
});

/**
 * Detectar cambios en los archivos
 */
gulp.task('watch', function() {

  gulp.watch('./src/scripts/**')
  .on('change', function(file){
    gutil.log(gutil.colors.yellow(`Actualizado Js: (${file.path})`));
  });

  gulp.watch(['./src/**/*.html'])
    .on('change', function(file){
      gutil.log(gutil.colors.blue(`Actualizado Html: (${file.path})`));
    });

  gulp.watch('./src/styles/sass/**/*', function() {
    runSequence('convert-sass');
  })
  .on('change', function(file){
    gutil.log(gutil.colors.green(`Actualizado Css: (${file.path})`));
  });
});

/**
 * Empezar Gulp
 */
gulp.task('start', ['convert-sass', 'watch']);
