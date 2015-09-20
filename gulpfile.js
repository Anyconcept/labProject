//var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

//elixir(function(mix) {
//    mix.sass('app.scss');
//});


// ------------------------------------------------------

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    bowerfiles = require('main-bower-files'),
    filter = require('gulp-filter'),
    size = require('gulp-size');

/**
 * Tache :
 *  - Réalise les taches 'images', 'imagesCSS', 'bower', 'js', sass'
 *  - Création serveur BrowserSync
 *   - Watch JS - CSS Maison
 *   - Watch JS et CSS Bower via fichier 'bower.json' et '.bowerrc'
 *   - Watch les fichiers PHP
 *   - Watch les fichiers images
 *   - Watch les fichiers imagesCSS
 *    - Reload après modifications
 */
gulp.task('default', ['images', 'imagesCSS', 'bower', 'js', 'sass'], function () {

    //Start server

    browserSync.init({
        proxy: {
            target: "http://local.dev"
        }
    });

    // Watch js et scss maison
    gulp.watch('resources/assets/sass/**/*.scss', ['sass']);
    gulp.watch('resources/assets/js/**/*.js', ['js']);

    // Watch libs Bower
    gulp.watch(['bower.json', '.bowerrc'], ['bower']).on('change', browserSync.reload);

    // Watch fichier php
    gulp.watch(['app/**/*.php', 'resources/views/**/*.php']).on('change', browserSync.reload);

    // Watch fichiers images et imagesCSS
    gulp.watch('resources/assets/images/**/*.*', ['images']);
    gulp.watch('resources/assets/imagesCSS/**/*.*', ['imagesCSS']);

});


/**
 * Tache : Compile les JS maison
 * Concatene les JS et les "uglifies"
 */
gulp.task('js', function () {
    gulp.src(['resources/assets/js/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(uglify({mangle: false})) //this can hurt if true with angular \o/
        .pipe(gulp.dest('public/js'))
        .pipe(size())
        .pipe(browserSync.stream());
});


/**
 * Tache : Compile les JS et CSS des Libs Bower
 * JS :
 *  - Concatene et "uglifie"
 *  CSS :
 *   - Concatene, autopréfixe et minifie
 */
gulp.task('bower', ['cleanVendorJs', 'cleanVendorCss'], function () {
    //gulp.src( bowerfiles() )
    //    .pipe( filter('**/*.{ttf,woff,eof,svg}') )
    //    .pipe( gulp.dest ('/public/fonts') );

    gulp.src(bowerfiles())
        .pipe(filter('**/*.js'))
        .pipe(concat('vendor.js'))
        .pipe(uglify({mangle: false})) //this can hurt if true with angular \o/
        .pipe(gulp.dest('public/js'))
        .pipe(size());

    gulp.src(bowerfiles())
        .pipe(filter('**/*.css'))
        .pipe(concat('vendor.css'))
        .pipe(autoprefixer({
            browsers: [
                "ie >= 8",
                "ie_mob >= 10",
                "ff >= 30",
                "chrome >= 34",
                "safari >= 7",
                "opera >= 23",
                "ios >= 7",
                "android >= 4.0",
                "bb >= 10"
            ]
        }))
        .pipe(minify({inliner: {timeout: 10000}}))
        .pipe(gulp.dest('public/css'))
        .pipe(size());

    //.pipe(browserSync.reload());


});

/**
 * Tache : Compile le SCSS
 */
gulp.task('sass', function () {
    return gulp.src("resources/assets/sass/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                "ie >= 8",
                "ie_mob >= 10",
                "ff >= 30",
                "chrome >= 34",
                "safari >= 7",
                "opera >= 23",
                "ios >= 7",
                "android >= 4.0",
                "bb >= 10"
            ]
        }))
        .pipe(gulp.dest("public/css"))
        .pipe(size())
        .pipe(browserSync.stream());
});

/**
 * Tache : Compresse les images
 *  - Vérifie les fichiers modifiés
 *  - Minifie les images
 *  - Transfert les images dans le répertoire public/images
 *   - Reload
 */
gulp.task('images', function(){
    return gulp.src('resources/assets/images/**/*.*')
        .pipe( changed('public/images') )
        .pipe( imagemin({ optimizationLevel: 7, progressive: true, interlace: true }) )
        .pipe( gulp.dest('public/images') );
});

/**
 * Tache : Compresse les images du theme
 *  - Vérifie les fichiers modifiers
 *  - Minifie les images
 *  - Transfert les images du theme dans public/images
 *   - Reload
 */
gulp.task('imagesCSS', function(){
    return gulp.src('resources/assets/imagesCSS/**/*.*')
        .pipe( changed('public/css') )
        .pipe( imagemin({ optimizationLevel: 7, progressive: true, interlace: true }) )
        .pipe( gulp.dest('public/css') );
});

/**
 * Tache : Nettoyer le js/vendor.js avant de créer la nouvelle version
 */
gulp.task('cleanVendorJs', function () {
    gulp.src('public/js/vendor.js')
        .pipe(clean({force: true}));
});

/**
 * Tache : Nettoyer le css/vendor.css avant de créer la nouvelle version
 */
gulp.task('cleanVendorCss', function () {
    gulp.src('public/css/vender.js')
        .pipe(clean({force: true}));
});


/**
 * Tache : Lister les fichiers Bower reconnus
 */
gulp.task('bowerfiles', function () {
    console.log(bowerfiles());
});
