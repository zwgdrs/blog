var rimraf, exec, fileInsert, fs, gulp, gulpIgnore, gutil, htmlmin, htmlreplace, moment, path, profile, vftp, webpackConfig, webpackStats, webpackStream, projectName;
fs = require('fs');
path = require('path');
gulp = require('gulp');
moment = require('moment');
gutil = require('gulp-util');
rimraf = require('rimraf');
vftp = require('vinyl-ftp');
htmlmin = require('gulp-htmlmin');
gulpIgnore = require('gulp-ignore');
exec = require('child_process').exec;
fileInsert = require("gulp-file-insert");
webpackStream = require('webpack-stream');
htmlreplace = require('gulp-html-replace');
projectName = JSON.parse(fs.readFileSync('package.json', 'utf-8')).name;
profile = JSON.parse(fs.readFileSync('.profile', 'utf-8'));
// 判断gulp指令
if (gutil.env._.indexOf('test') >= 0) {
  webpackConfig = require('./webpack.config.test');
}
if (gutil.env._.indexOf('deploy') >= 0) {
  webpackConfig = require('./webpack.config.prod');

}
webpackStats = null;
process.env.NODE_ENV = 'production';
gulp.task('clean', function(cb) {
  rimraf('dist', function(err) {
    if (err) {
      throw new gutil.PluginError("clean", err);
    }
    cb();
  });
});

gulp.task('assets', ['clean'], function() {
  return gulp.src('src/js/index.js').pipe(webpackStream(webpackConfig, null, function(err, stats) {
    webpackStats = stats.toJson({
      chunks: true,
      modules: true,
      chunkModules: true,
      reasons: true,
      cached: true,
      cachedAssets: true
    });
    return fs.writeFile('./analyse.log', JSON.stringify(webpackStats), null, 2);
  })).pipe(gulp.dest('dist'));
});

gulp.task('tcm', ['assets'], function(cb) {
  var apr, assetsNames, tcm;
  assetsNames = webpackStats.assetsByChunkName;
  tcm = profile.tcm;
  apr = "//t.c.m.163.com/adminHtml/" + projectName + "/";
  return gulp.src('src/*.html').pipe(htmlreplace({
    'css': apr + 'css/app.css',
    'bundle': apr + 'js/bundle.js',
    'vendor': apr + 'js/vendor.js'
  })).pipe(fileInsert({
    "/*webpackBootstrap*/": path.join('dist', assetsNames.webpackBootstrap[0])
  })).pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true
  })).pipe(gulp.dest('dist'));
});

gulp.task('test', ['tcm'], function(cb) {
  var tcm;
  tcm = profile.tcm;
  exec("scp -r dist/* " + tcm.name + "@" + tcm.host + ":/home/appops/app/adminHtml/" + projectName + "/", function(err) {
    if (err) {
      throw new gutil.PluginError("clean", err);
    }
    gutil.log('Done!');
    return cb();
  });
});

gulp.task('ftp', ['assets'], function(cb) {
  var conn = createConnection(profile.ftp.img);
  return gulp.src(['dist/**/*'])
    .pipe(gulpIgnore.exclude(['**/*.map', '**/{img,img/**}', '**/webpackBootstrap.*.js', '*.html']))
    .pipe(conn.dest('/utf8/gdrs/' + projectName + '/'))
})

gulp.task('deploy', ['ftp'], function(cb) {
  console.log(1)
  var apr, assetsNames, cssFile, jsFile;
  assetsNames = webpackStats.assetsByChunkName;
    console.log(2)
  assetsNames.app.forEach(function(item) {
    if (item.match(/css$/)) {
      cssFile = item;
    }
    if (item.match(/js$/)) {
      jsFile = item;
    }
  })
    console.log(3)
  apr = "http://img6.cache.netease.com/utf8/gdrs/" + projectName + "/";
  return gulp.src('src/*.html').pipe(htmlreplace({
    'css': apr + cssFile,
    'bundle': apr + jsFile,
    'vendor': apr + assetsNames.vendor[0]
  })).pipe(fileInsert({
    "/*webpackBootstrap*/": path.join('dist', assetsNames.webpackBootstrap[0])
  })).pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true
  })).pipe(gulp.dest('dist'));
});

function createConnection(ftpConfig) {
  var options = {
    host: ftpConfig.host,
    port: ftpConfig.port,
    user: ftpConfig.username,
    password: ftpConfig.password,
    parallel: 5
  };

  if ( ftpConfig.secure ) {
    options.secure = true;
    options.secureOptions = {
      requestCert: true,
      rejectUnauthorized: false
    }
  }

  return vftp.create(options);
}



