'use strict';

const { dest, src, task, watch } = require('gulp'),
  { colors, log } = require('gulp-util'),
  bytediff    = require('gulp-bytediff'),
  concat      = require('gulp-concat'),
  del         = require('del'),
  imagemin    = require('gulp-imagemin'),
  processhtml = require('gulp-processhtml'),
  pump        = require('pump'),
  runSequence = require('run-sequence'),
  sass        = require('gulp-sass'),
  strip       = require('gulp-strip-comments'),
  uglify      = require('gulp-uglify'),
  uglifycss   = require('gulp-uglifycss');

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

const scripts = {
  todos: [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/swiper/dist/js/swiper.min.js',
    './src/scripts/index.js'
  ],
  TweenMax: [
    './node_modules/gsap/src/minified/TweenLite.min.js',
    './node_modules/gsap/src/minified/easing/EasePack.min.js',
    './node_modules/gsap/src/minified/plugins/CSSPlugin.min.js',
    './node_modules/gsap/src/minified/plugins/ScrollToPlugin.min.js'
  ]
};

const fonts = [
  './node_modules/font-awesome/fonts/**/*'
];

/**
 * Construir el proyecto
 */
task('build', function() {
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
task('clean-build', function() {
  del('./dist');
});

/**
 * Copiar y convertir SASS a CSS
 */
task('convert-sass', function(cb) {
  pump([
    src('./src/styles/sass/style.scss'),
    sass().on('error', sass.logError),
    dest('./src/styles')], cb);
});

/**
 * Comprimir y copiar CSS
 */
task('compress-css', function(cb) {
  pump([
    src(styles),
    bytediff.start(),
    uglifycss(),
    bytediff.stop(function(data) { return calculateDataSavings(data); }),
    dest('./dist/styles')], cb);
});

/**
 * Comprimir y copiar JS
 */
task('compress-js', function() {
  pump([
    src(scripts.todos),
    bytediff.start(),
    uglify(),
    strip(),
    bytediff.stop(function(data) { return calculateDataSavings(data); }),
    dest('./dist/scripts')]);

  pump([
    src(scripts.TweenMax),
    bytediff.start(),
    uglify(),
    strip(),
    bytediff.stop(function(data) { return calculateDataSavings(data); }),
    concat('TweenMax.min.js'),
    dest('./dist/scripts')]);
});

/**
 * Comprimir y copiar imágenes
 */
task('compress-images', function(cb) {
  pump([
    src(['./src/images/*', '!./src/images/*.svg']),
    bytediff.start(),
    imagemin(),
    bytediff.stop(function(data) { return calculateDataSavings(data); }),
    dest('./dist/images')], cb);
});

task('copy-fonts', function(cb) {
  pump([src(fonts), dest('./dist/fonts')], cb);
});

/**
 * Procesar y copiar html
 */
task('process-html', function(cb) {
  pump([
    src(['./src/*.index']),
    processhtml(),
    strip(),
    dest('./dist')], cb);
});

/**
 * Copiar los archivos que no requieren ser procesados
 */
task('copy-main-files', function() {
  pump([
    src(['./src/locales/*.json']),
    dest('./dist/locales')]);

  pump([
    src(['./src/sounds/*.wav']),
    dest('./dist/sounds')]);
});

/**
 * Detectar cambios en los archivos
 */
task('watch', function() {

  watch('./src/scripts/**')
  .on('change', function(file){
    log(colors.yellow(`Actualizado Js: (${file.path})`));
  });

  watch(['./src/**/*.html'])
    .on('change', function(file){
      log(colors.blue(`Actualizado Html: (${file.path})`));
    });

  watch('./src/styles/sass/**/*', function() {
    runSequence('convert-sass');
  })
  .on('change', function(file){
    log(colors.green(`Actualizado Css: (${file.path})`));
  });
});

/**
 * Empezar Gulp
 */
task('start', ['convert-sass', 'watch']);
