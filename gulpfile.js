const { src, dest, watch, parallel } = require('gulp')

// CSS 
const sass          = require('gulp-sass')(require('sass'))
const plumber       = require('gulp-plumber')
const cssnano       = require('cssnano')
const postcss       = require('gulp-postcss')
const sourcemaps    = require('gulp-sourcemaps')
const autoprefixer  = require('autoprefixer')

// Images
const webp          = require('gulp-webp')
const avif          = require('gulp-avif')
const cache         = require('gulp-cache')
const imagemin      = require('gulp-imagemin')
const rename        = require('gulp-rename')

// Javascript
const terser        = require('gulp-terser')


// HTML
const pug           = require('gulp-pug')

// Convert .SASS files to .CSS, minify, standardize and save //
function css ( done ) {
    src( 'src/scss/**/*.scss' )                        
        .pipe( sourcemaps.init() )                     
        .pipe( plumber() )
        .pipe( sass() )                                
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.') )                 
        .pipe( dest( 'build/css' ) )                   
    done()  
}

function favicon ( done ) {
    src( 'src/assets/img/**/*.ico' )
        .pipe( plumber() )
        .pipe( dest( 'build/img' ) )
    done()
}

function html ( done ) {
    src( 'src/*.html' )
        .pipe( plumber() )
        .pipe( dest( 'build' ) )
    done()
}

// Minify Javascript 
function javascript( done ) {
    src('src/js/**/*.js')
        .pipe( sourcemaps.init() )
        .pipe( plumber() )
        .pipe( terser() )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/js') )
    done()
}

// Minify PNG / JPG
function imagesMin(done) {
    const options = {
        optimizationLevel: 3
    }
    src('src/assets/img/**/*.{png,jpg,jpeg}')
        .pipe( cache( imagemin( options ) ) )
        .pipe( dest('build/img') )
    done()
}

// Convert PNG / JPG to WEBP
function versionWebp( done ) {
    const options = {
        quality: 50
    }
    src('src/assets/img/**/*.{png,jpg,jpeg}')
        .pipe( webp( options ) )
        .pipe( dest('build/img') )
    done()
}

// Convert PNG / JPG to AVIF
function versionAvif( done ) {
    const option = {
        quality: 50
    }
    src('src/assets/img/**/*.{png,jpg,jpeg}')
        .pipe( avif( option ) )
        .pipe( dest('build/img') )
    done()
}


function dev( done ) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)
    watch('src/*.html', html)
    done()
}

exports.dev = parallel( imagesMin, versionWebp, versionAvif, javascript, css, html, favicon, dev)  