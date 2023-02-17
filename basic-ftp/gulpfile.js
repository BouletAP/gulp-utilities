'use strict';

var gulp = require('gulp');
var gutil = require( 'gulp-util' );

var ftpinfo = require('./gulp-private');
var ftp = require( 'vinyl-ftp' );


var projectdata = {
  "sync_dev" : [
    './'
  ],
  "scss" : ["./scss/"]
};


gulp.task('ftp-deploy-watch', function() {

  var conn = ftp.create({
    host: ftpinfo.host,
    user: ftpinfo.user,
    password: ftpinfo.password,
    parallel: 5,
    log: gutil.log
  });

  gulp.watch(projectdata.sync_dev).on('change', function(event) {
    console.log('Changes detected! Uploading file "' + event);
    return gulp.src( [event], { base: '.', buffer: false } )
      .pipe( conn.dest( ftpinfo.remoteFolder ) )
    ;
  });
});

gulp.task('watcher', gulp.parallel ('ftp-deploy-watch'));   
