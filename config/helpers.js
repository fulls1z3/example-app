/**
 * Dependencies
 */
const $ = {};

$.path = require('path');
$.jsonSub = require('json-sub')();

/**
 * Helper methods
 */
const root = function(args) {
  const ROOT = $.path.resolve(__dirname, '..');
  args = Array.prototype.slice.call(arguments, 0);

  return $.path.join.apply($.path, [ROOT].concat(args));
};

const loadSettings = function(settings) {
  let result = $.jsonSub.substituteSync(settings, {
    '{{root}}': settings.root
  });

  result = $.jsonSub.substituteSync(result, {
    '{{src_root}}': result.paths.src.root,
    '{{public_root}}': result.paths.public.root,
    '{{temp_root}}': result.paths.temp.root,
  });

  result = $.jsonSub.substituteSync(result, {
    '{{build_root}}': result.paths.temp.build.root
  });

  return result;
};

/**
 * Exports
 */
exports.root = root;
exports.loadSettings = loadSettings;
