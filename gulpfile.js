var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    pump = require('pump'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    eslint = require('gulp-eslint'),
    sassLint = require('gulp-sass-lint'),
    notify = require('gulp-notify'),
    pxtorem = require('gulp-pxtorem'),
    imagemin = require('gulp-imagemin'),
    cssScss = require('gulp-css-scss'),
    reload = browserSync.reload,
    src = './source',
    dest = './.tmp',
    css = `${src}/sass`,
    js = `${src}/js`;
    imgs = `${src}/images`;

function errorMessage(err, title) {
  notify.onError({
    actions: 'Close',
    message: 'Error: <%= error.message %>',
    sound: 'Purr',
    subtitle: 'Check console for errors',
    timeout: 30,
  })(err);
}

gulp.task('fonts', function() {
  return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./source/fonts'))
})

gulp.task('imageOptim', function() {
  return gulp.src(`${imgs}/**/*`)
    .pipe(imagemin())
    .pipe(gulp.dest(imgs))
});

gulp.task('jsLint', function() {
  return gulp.src(`${js}/**/*.js`)
    .pipe(plumber({
      errorHandler: function errors(err) {
        errorMessage(err, 'JS error');
        this.emit('end');
      },
    }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

gulp.task('js', ['jsLint'], function() {
  return gulp.src(`${js}/site.js`)
    .pipe(sourcemaps.init())
    .pipe(browserify())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${dest}/js`))
});

gulp.task('sass', function() {
  return gulp.src(`${css}/**/*.s+(a|c)ss`)
    .pipe(plumber({
      errorHandler: function errors(err) {
        errorMessage(err, 'CSS error');
        this.emit('end');
      },
    }))
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(pxtorem())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${dest}/styles`));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'localhost:4567',
    open: false,
    reloadDelay: 700,
    files: [`${dest}/**/*.{js,css}`, `${src}/**/*.{html,erb,haml,markdown}`,  './data/**/*.{yml,json}',]
  });
});

gulp.task('default', ['browser-sync', 'imageOptim', 'js', 'sass', 'fonts'], function() {
  gulp.watch(`${css}/**/*.{css,scss,sass}`, ['sass']);
  gulp.watch(`${js}/**/*.js`, ['js']);
  gulp.watch(`${src}/images/**/*.{png,jpg,svg,gif}`);
});

gulp.task('build', ['js', 'sass', 'imageOptim']);
