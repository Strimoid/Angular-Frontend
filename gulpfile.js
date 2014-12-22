var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');

gulp.task('default', ['build', 'watch'], function() {});
gulp.task('build', ['deps-css', 'deps-js', 'html', 'css', 'js']);

gulp.task('deps-css', function() {
    return gulp.src(mainBowerFiles({ filter: /\.css$/ }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('deps.css'))
        .pipe(plugins.autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('deps-js', function() {
    return gulp.src(mainBowerFiles({ filter: /\.js$/ }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('deps.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('html', function () {
    var htmlMinOpts = {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true
    };

    return gulp.src('app/**/*.html')
        .pipe(plugins.htmlmin(htmlMinOpts))
        .pipe(plugins.angularTemplatecache({
            filename: 'templates.js',
            module: 'app.templates',
            standalone: true
        }))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('css', function() {
    return gulp.src('static/css/*.css')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.autoprefixer('last 2 versions'))
        .pipe(plugins.concat('style.css'))
        .pipe(plugins.minifyCss())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function() {
    return gulp.src(['app/**/*.js'])
        .pipe(plugins.sourcemaps.init())
        //.pipe(plugins.ngAnnotate({ single_quotes: true }))
        //.pipe(plugins.traceur())
        .pipe(plugins.concat('app.js'))
        //.pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('pot', function () {
    return gulp.src(['app/**/*.html', 'app/**/*.js'])
        .pipe(plugins.angularGettext.extract('english.pot'))
        .pipe(gulp.dest('po/'));
});

gulp.task('translations', function () {
    return gulp.src('po/**/*.po')
        .pipe(plugins.angularGettext.compile())
        .pipe(plugins.concat('translations.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('static/css/**/*.css', ['css']);
    gulp.watch('app/**/*.js', ['js']);
});