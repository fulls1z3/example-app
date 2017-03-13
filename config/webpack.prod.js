/**
 * Webpack helpers & dependencies
 */
const $$ = require('./webpack-helpers'),
  commonConfig = require('./webpack.common'),
  webpackMerge = require('webpack-merge');

const noEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin'),
  optimizeJsPlugin = require('optimize-js-plugin'),
  definePlugin = require('webpack/lib/DefinePlugin'),
  commonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin'),
  uglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin'),
  compressionPlugin = require('compression-webpack-plugin'),
  scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  loaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge(commonConfig({env: ENV}),
  {
    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    //devtool: 'source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {
      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: $$.root('./dist'),
      publicPath: 'dist/',

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].[chunkhash].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[name].[chunkhash].bundle.map',

      /**
       * The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].[chunkhash].chunk.js'
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
      /**
       * Plugin: NoEmitOnErrorsPlugin
       * Description: Skips the emitting phase (and recording phase) when
       * there are errors while compiling.
       *
       * See: https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
       */
      new noEmitOnErrorsPlugin(),

      /**
       * Webpack plugin to optimize a JavaScript file for faster initial load
       * by wrapping eagerly-invoked functions.
       *
       * See: https://github.com/vigneshshanmugam/optimize-js-plugin
       */

      new optimizeJsPlugin({
        sourceMap: false
      }),

      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
      new definePlugin({
        'ENV': JSON.stringify(ENV),
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV)
        }
      }),

      /**
       * Plugin: CommonsChunkPlugin
       * Description: Shares common code between the pages.
       * It identifies common modules and put them into a commons chunk.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
       */
      new commonsChunkPlugin({
        name: ['app', 'polyfills']
      }),

      /**
       * Plugin: UglifyJsPlugin
       * Description: Minimize all JavaScript output of chunks.
       * Loaders are switched into minimizing mode.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
       */
      new uglifyJsPlugin({
        beautify: false,
        output: {
          comments: false
        },
        mangle: {
          screw_ie8: true
        },
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false // we need this for lazy v8
        }
      }),

      /**
       * Plugin: CompressionPlugin
       * Description: Prepares compressed versions of assets to serve
       * them with Content-Encoding
       *
       * See: https://github.com/webpack/compression-webpack-plugin
       */
      //new compressionPlugin({
      //    regExp: /\.css$|\.html$|\.js$|\.map$/,
      //    threshold: 2 * 1024
      //}),

      /**
       * Plugin: ScriptExtHtmlWebpackPlugin
       * Description: Enhances html-webpack-plugin functionality
       * with different deployment options for your scripts including:
       *
       * See: https://github.com/numical/script-ext-html-webpack-plugin
       */
      new scriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
        async: [/polyfill/]
      }),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new loaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          /**
           * Html loader advanced options
           *
           * See: https://github.com/webpack/html-loader#advanced-options
           */
          // TODO: Need to workaround Angular's html syntax => #id [bind] (event) *ngFor
          htmlLoader: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [
              [/#/, /(?:)/],
              [/\*/, /(?:)/],
              [/\[?\(?/, /(?:)/]
            ],
            customAttrAssign: [/\)?]?=/]
          }
        }
      })
    ],

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  });
