const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');

// compile scss into css
function style() {
    // find scss file
    return gulp.src('./src/scss/**/*.scss')
    // pass scss file through compiler
    .pipe(sass())
    // output compiled css to destination folder
    .pipe(gulp.dest('./dist/css'))

    .pipe(browserSync.stream())
};


function page() {
    return gulp.src('src/pages/**/*.+(html|njk)')
    .pipe(nunjucksRender({
        path: ['src/templates']
    }))
    .pipe(gulp.dest('dist'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./src/pages/**/*.+(html|njk)', page);
    gulp.watch('./src/templates/**/*.+(html|njk)', page);
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.page = page;
exports.watch = watch;
