var gulp = require('gulp'),
    gp_clean = require('gulp-clean');
    //gp_concat = require('gulp-concat'),
    //gp_sourcemaps = require('gulp-sourcemaps'),
    //gp_typescript = require('gulp-typescript'),
    //gp_uglify = require('gulp-uglify');



/// Define paths
var srcPaths = {
    js: [
        'Scripts/js/**/*.js',
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/typescript/lib/typescript.js'
    ],
    js_angular: [
        'node_modules/@angular/**'
    ],
    js_rxjs: [
        'node_modules/rxjs/**'
    ]
};

var destPaths = {
    js: 'wwwroot/js/',
    js_angular: 'wwwroot/js/@angular/',
    js_rxjs: 'wwwroot/js/rxjs/'
};




// Copy all JS files from external libraries to wwwroot/js
gulp.task('js', function () {
    gulp.src(srcPaths.js_angular)
        .pipe(gulp.dest(destPaths.js_angular));
    gulp.src(srcPaths.js_rxjs)
        .pipe(gulp.dest(destPaths.js_rxjs));
    return gulp.src(srcPaths.js)
        .pipe(gulp.dest(destPaths.js));
});

// Delete wwwroot/js contents
gulp.task('js_clean', function () {
    return gulp.src(destPaths.js + "*.*", { read: false })
    .pipe(gp_clean({ force: true }));
});


// Define the default task so it will launch all other tasks
gulp.task('all', ['js_clean','js' ]);


