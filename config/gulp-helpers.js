/**
 * Dependencies
 */
const gulp = require('gulp'),
      $ = {},
      $$ = require('./helpers');

$.lazypipe = require('lazypipe');
$.tslint = require('gulp-tslint');
$.chalk = require('chalk');

/**
 * Helper methods
 */
var done = function (err, callback) {
    if (err) {
        process.exit(1);
        callback();
    }

    callback();
}

var tslint = function () {
    return $.lazypipe()
        .pipe(function () {
            return $.tslint({ formatter: 'verbose' });
        })
        .pipe(function () {
            return $.tslint.report({ emitError: false });
        })();
}

var webpackFormatter = function (err, stats, callback, settings) {
    if (err) {
        console.log($.chalk.red(`Error: ${err}`));
        callback();
    } else {
        const statsJson = stats.toJson(),
              warnings = statsJson.warnings,
              errors = statsJson.errors;

        Object.keys(warnings)
            .forEach(function (key) {
                console.log($.chalk.gray(`Warning: ${warnings[key]}\n`));
            });

        if (warnings.length > 0)
            console.log($.chalk.gray(`    (${warnings.length}) warning(s) total.\n`));

        Object.keys(errors)
            .forEach(function (key) {
                console.log($.chalk.red(`Error: ${errors[key]}\n`));
            });

        if (errors.length > 0)
            console.log($.chalk.red(`    (${errors.length}) error(s) total.\n`));

        Object.keys(stats.compilation.assets)
            .forEach(function (key) {
                console.log(`Webpack: output ${$.chalk.green(key)}`);
            });

        console.log(`Webpack: ${$.chalk.blue(`finished`)}`);

        callback();
    }
}

/**
 * Exports
 */
exports.root = $$.root;
exports.done = done;
exports.tslint = tslint;
exports.webpackFormatter = webpackFormatter;
