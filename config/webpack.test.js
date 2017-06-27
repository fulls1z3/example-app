/**
 * Webpack helpers & dependencies
 */
let settings = require('./build-config');
const $$ = require('./webpack-helpers');

settings = $$.loadSettings(settings);

const definePlugin = require('webpack/lib/DefinePlugin'),
  contextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin'),
  loaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
  /**
   * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
   *
   * Do not change, leave as is or it wont work.
   * See: https://github.com/webpack/karma-webpack#source-maps
   */
  devtool: settings.webpack.devtool.TEST,

  /**
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    /**
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['.ts', '.js'],

    /**
     * Make sure root is ./build
     */
    modules: [
      $$.root(settings.paths.temp.build.root),
      $$.root(settings.paths.NODE_MODULES)
    ]
  },

  /**
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [
      /**
       * source-map-loader for *.js
       *
       * See: https://github.com/webpack/source-map-loader
       */
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          $$.root(`${settings.paths.NODE_MODULES}/rxjs`),
          $$.root(`${settings.paths.NODE_MODULES}/@angular`)
        ]
      },

      /**
       * awesome-typescript-loader and angular2-template-loader for *.ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       * See: https://github.com/TheLarkInn/angular2-template-loader
       */
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            query: {
              // use inline sourcemaps for "karma-remap-coverage" reporter
              sourceMap: false,
              inlineSourceMap: true,
              compilerOptions: {
                // Remove TypeScript helpers to be injected
                // below by DefinePlugin
                removeComments: true
              }
            }
          },
          'angular2-template-loader'
        ],
        exclude: [/\.e2e\.ts$/]
      },

      /**
       * json-loader for *.json
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: [$$.root(`${settings.paths.temp.build.root}/index.html`)]
      },

      /**
       * to-string-loader, and css-loader for *.css
       *
       * See: https://github.com/gajus/to-string-loader
       * See: https://github.com/webpack-contrib/css-loader
       */
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        exclude: [$$.root(`${settings.paths.temp.build.root}/index.html`)]
      },

      /**
       * html-loader for *.html
       *
       * See: https://github.com/webpack/html-loader
       */
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: [$$.root(`${settings.paths.temp.build.root}/index.html`)]
      },

      /**
       * istanbul-instrumentation-loader for *.js & *.ts
       *
       * See: https://github.com/deepsweet/istanbul-instrumenter-loader
       */
      {
        enforce: 'post',
        test: /\.(js|ts)$/,
        use: 'istanbul-instrumenter-loader?esModules',
        include: $$.root(settings.paths.temp.build.root),
        exclude: [
          $$.root(settings.paths.NODE_MODULES),
          /\.(e2e|spec|d)\.ts$/
        ]
      }
    ]
  },

  /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
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
     * Plugin: ContextReplacementPlugin
     * Description: Provides context to Angular's use of System.import
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
     * See: https://github.com/angular/angular/issues/11580
     */
    new contextReplacementPlugin(
      // fix the warning in ./~/@angular/core/src/linker/system_js_ng_module_factory_loader.js
      /angular([\\\/])core([\\\/])(esm([\\\/])src|src)([\\\/])linker/,
      $$.root(settings.paths.temp.build.root)
    ),

    /**
     * Plugin LoaderOptionsPlugin (experimental)
     *
     * See: https://gist.github.com/sokra/27b24881210b56bbaff7
     */
    new loaderOptionsPlugin({
      debug: true,
      options: {}
    })
  ],

  /**
   * Disable performance hints
   *
   * See: https://github.com/a-tarasyuk/rr-boilerplate/blob/master/webpack/dev.config.babel.js#L41
   */
  performance: {
    hints: false
  },

  /**
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
