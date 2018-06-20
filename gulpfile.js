'use strict';

// 1. LOAD PLUGINS
var gulp = require('gulp');

var p = require('gulp-load-plugins')({ // This loads all the other plugins.
  DEBUG: false,
  pattern: ['gulp-*', 'gulp.*', 'del', 'run-*', 'browser*', 'vinyl-*'],
  rename: {
    'vinyl-source-stream': 'source',
    'vinyl-buffer': 'buffer',
    'gulp-eslint': 'eslint',
    'gulp-notify': 'notify',
    'gulp-sass-lint': 'sassLint',
    'gulp-babel': 'babel',
    'gulp-plumber': 'plumber',
    'gulp-util': 'gutil'
  },
});

// 2. CONFIGURATION
var
  src  = 'source/', // The Middleman source folder
  dest = '.tmp/',   // The "hot" build folder used by Middleman's external pipeline
  data = 'data/',

development = p.environments.development,
production = p.environments.production,

css = {
  in: src + 'stylesheets/**/*.{css,scss,sass}',
  out: dest + 'stylesheets/',
},

sassOpts = {
  imagePath: '../images',
  errLogToConsole: true
},

autoprefixerOpts = {
  browsers: ['last 3 versions', '> 5%']
},

js = {
  in: src + 'javascripts/**/*.{js,coffee}',
  out: dest + 'javascripts/'
},

uglifyOpts = {
  output: {
    comments: 'uglify-save-license'
  }
},

images = {
  in: src + 'images/*',
  out: dest + 'images/'
},

serverOpts = {
  proxy: 'localhost:4567',
  open: false,
  reloadDelay: 700,
  files: [dest + '**/*.{js,css}', src + '**/*.{html,erb,haml,markdown}', data + '**/*.{yml,json}',]
};

function errorMessage(err, title) {
  p.notify.onError({
    actions: 'Close',
    message: 'Error: <%= error.message %>',
    sound: 'Purr',
    subtitle: 'Check console for errors',
    timeout: 30,
  })(err);
}

// 3. WORKER TASKS

// CSS Preprocessing
gulp.task('css', function() {
  return gulp.src(css.in)
    .pipe(development(p.plumber({
      errorHandler: function errors(err) {
        errorMessage(err, 'CSS error');
        this.emit('end');
      },
    })))
    .pipe(development(p.sassLint()))
    .pipe(development(p.sassLint.format()))
    .pipe(development(p.sassLint.failOnError()))
    .pipe(development(p.sourcemaps.init()))
    .pipe(p.sass(sassOpts).on('error', p.sass.logError))
    .pipe(p.autoprefixer(autoprefixerOpts)).on('error', handleError)
    .pipe(production(p.cleanCss()))
    .pipe(development(p.sourcemaps.write()))
    .pipe(gulp.dest(css.out));
});

gulp.task('fonts', function() {
  return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./source/fonts'))
})

// Javascript Bundling
gulp.task('js', function() {
  var b = p.browserify({
    entries: src + 'javascripts/all.js',
    debug: true
  });

  gulp.src(js.in)
    .pipe(development(p.plumber({
      errorHandler: function errors(err) {
        errorMessage(err, 'JS error');
        this.emit('end');
      },
    })))
    .pipe(development(p.eslint()))
    .pipe(development(p.eslint.format()))
    .pipe(development(p.eslint.failAfterError()))

  return b.bundle().on('error', handleError)
    .pipe(p.source('bundle.js'))
    .pipe(production() ? p.buffer() : p.gutil.noop())
    .pipe(production(p.stripDebug()))
    .pipe(production(p.babel({
        presets: ['es2015']
      })
    ))
    .pipe(production() ? p.uglify(uglifyOpts) : p.gutil.noop())
    .pipe(gulp.dest(js.out));
});

// Image Optimization
gulp.task('images', function() {
  return gulp.src(images.in)
    .pipe(p.changed(images.out))
    .pipe(p.imagemin())
    .pipe(gulp.dest(images.out));
});

// Clean .tmp/
gulp.task('clean', function() {
  p.del([
    dest + '*'
  ]);
});

// Asset Size Report
gulp.task('sizereport', function () {
  return gulp.src(dest + '**/*')
    .pipe(p.sizereport({
      gzip: false
    }));
});

// 4. SUPER TASKS

// Development Task
gulp.task('development', function(done) {
  p.runSequence('clean', 'css', 'fonts', 'js', 'images', done);
});

// Production Task
gulp.task('production', function(done) {
  p.runSequence('clean', 'css', 'fonts', 'js', 'images', 'sizereport', done);
});

// Default Task
gulp.task('default', ['development'], function() {

  p.browserSync.init(serverOpts);

  gulp.watch(css.in, ['css']);
  gulp.watch(js.in, ['js']);
  gulp.watch(images.in, ['images']);

});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
