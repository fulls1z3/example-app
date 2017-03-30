'use strict';

/**
 * Gulp helpers & dependencies
 */
const gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: [
      'gulp-*',
      'async',
      'rimraf',
      'webpack',
      'webpack-dev-server'
    ]
  }),
  $$ = require('./gulp-helpers');

/**
 * Define & include tasks
 */
const tasks = {};

/**
 * AoT
 */
const aot = {
  compile: function(done) {
    const options = {
      continueOnError: false, // default = false, true means don't emit error event
      pipeStdout: false, // default = false, true means stdout is written to file.contents
      customTemplatingThing: 'test' // content passed to gutil.template()
    };
    const reportOptions = {
      err: true, // default = true, false means don't write err
      stderr: true, // default = true, false means don't write stderr
      stdout: true // default = true, false means don't write stdout
    };

    return gulp.src('./tsconfig.json')
      .pipe($.exec('"./node_modules/.bin/ngc" -p "./tsconfig.json"', options))
      .pipe($.exec.reporter(reportOptions))
      .on('end', done);
  }
};

aot.compile.displayName = 'compile:ngc';

/**
 * Clean file(s)
 */
const clean = {
  build: function(done) {
    $.rimraf('./build', done);
  },
  'public': function(done) {
    $.rimraf(`./public`, done);
  },
  artifacts: function(done) {
    $.rimraf('./index.html', done);
  },
  temp: function(done) {
    $.rimraf('./.temp', done);
  }
};

clean.build.displayName = 'clean:build';
clean.public.displayName = 'clean:public';
clean.artifacts.displayName = 'clean:artifacts';
clean.temp.displayName = 'clean:temp';

/**
 * Assets
 */
const assets = {
  css: {
    copy: function(done) {
      gulp.src([
        './src/**/*.css'
      ])
        .pipe(gulp.dest('./build'))
        .on('end', done);
    }
  },
  assets: {
    copy: function(done) {
      gulp.src([
        './src/assets/**/*.json'
      ])
        .pipe(gulp.dest('./build/assets'))
        .on('end', done);
    }
  },
  copy: function(done) {
    $.async.parallel([
        assets.css.copy,
        assets.assets.copy
      ],
      function(err) {
        $$.done(err, done);
      });
  }
};

assets.copy.displayName = 'copy:assets';

/**
 * Views
 */
const views = {
  build: {
    copy: function(done) {
      gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./build'))
        .on('end', done);
    }
  },
  assets: {
    copy: function(done) {
      gulp.src('./public/assets/index.html')
        .pipe(gulp.dest('./public'))
        .on('end', done);
    }
  }
};

views.build.copy.displayName = 'copy:views';
views.assets.copy.displayName = 'copy:index.html';

/**
 * TypeScript
 */
const ts = {
  copy: function(done) {
    gulp.src([
      './src/**/*.ts',
      '!./environments/**/*.ts'
    ])
      .pipe(gulp.dest('./build'))
      .on('end', done);
  },
  lint: function(done) {
    gulp.src([
      './src/**/*.ts'
    ])
      .pipe($$.tslint())
      .on('end', done);
  }
};

ts.copy.displayName = 'copy:ts';
ts.lint.displayName = 'lint:ts';

/**
 * Bundle
 */
const bundle = {
  dev: function(done) {
    const conf = require('./webpack.dev.js');

    $.webpack(conf)
      .run(function(err, stats) {
        $$.webpackFormatter(err, stats, done);
      });
  },
  prod: function(done) {
    const conf = require('./webpack.prod.js');

    $.webpack(conf)
      .run(function(err, stats) {
        $$.webpackFormatter(err, stats, done);
      });
  }
};

bundle.dev.displayName = 'bundle:dev';
bundle.prod.displayName = 'bundle:prod';

/**
 * Tests
 */
const tests = {
  run: function(done) {
    const server = require('karma').Server;

    new server({
        configFile: $$.root('karma.conf.js'),
        singleRun: true
      },
      function() {
        done();
        process.exit(0);
      }).start();
  }
};

tests.run.displayName = 'tests:run';

/**
 * Tasks
 */
tasks.aot = aot;
tasks.clean = clean;
tasks.assets = assets;
tasks.views = views;
tasks.ts = ts;
tasks.bundle = bundle;
tasks.tests = tests;

/**
 * Task: clean
 */
gulp.task('clean',
  gulp.parallel(
    tasks.clean.build,
    tasks.clean.public,
    tasks.clean.artifacts,
    tasks.clean.temp
  ));

/**
 * Task: build:dev
 */
gulp.task('build:dev',
  gulp.series(
    gulp.parallel(
      tasks.assets.copy,
      tasks.views.build.copy,
      tasks.ts.copy
    ),
    tasks.bundle.dev,
    views.assets.copy
  ));

/**
 * Task: build:prod
 */
gulp.task('build:prod',
  gulp.series(
    gulp.parallel(
      tasks.assets.copy,
      tasks.views.build.copy,
      tasks.ts.copy
    ),
    tasks.aot.compile,
    tasks.clean.temp,
    tasks.bundle.prod,
    views.assets.copy
  ));

/**
 * Task: test
 */
gulp.task('test',
  gulp.series(
    'clean',
    gulp.parallel(
      tasks.views.build.copy,
      tasks.ts.copy
    ),
    tasks.tests.run
  ));

/**
 * Task: review:ts
 */
gulp.task('review:ts',
  gulp.series(
    tasks.ts.lint
  ));
