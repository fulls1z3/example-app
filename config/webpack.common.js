/**
 * Webpack helpers & dependencies
 */
let settings = require('./build-config');
const $$ = require('./webpack-helpers');

settings = $$.loadSettings(settings);

const definePlugin = require('webpack/lib/DefinePlugin'),
  checkerPlugin = require('awesome-typescript-loader').CheckerPlugin,
  contextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin'),
  copyWebpackPlugin = require('copy-webpack-plugin'),
  htmlWebpackPlugin = require('html-webpack-plugin'),
  scriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  loaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
  const isProd = options.env === 'production';

  return {
    /**
     * Cache generated modules and chunks to improve performance for multiple incremental builds.
     * This is enabled by default in watch mode.
     * You can pass false to disable it.
     *
     * See: http://webpack.github.io/docs/configuration.html#cache
     */
    //cache: false,

    /**
     * The entry point for the bundle
     * Our Angular app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {
      'polyfills': $$.root(`${settings.paths.src.root}/polyfills.ts`),
      'app': $$.root(`${settings.paths.src.root}/main${isProd ? '-prod' : ''}.ts`)
    },

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
      path: $$.root(settings.paths.public.assets),
      publicPath: 'assets/'
    },

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

      // An array of directory names to be resolved to the current directory
      modules: [
        $$.root(settings.paths.temp.build.root),
        $$.root(settings.paths.NODE_MODULES),
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
         * TS linter
         */
        {
          enforce: 'pre',
          test: /\.ts$/,
          use: 'tslint-loader',
          exclude: [
            $$.root(settings.paths.NODE_MODULES),
            /\.(ngfactory|ngstyle)\.ts$/
          ]
        },

        /**
         * Typescript loader support for .ts and Angular 2 async routes via .async.ts
         * Replace templateUrl and stylesUrl with require()
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         * See: https://github.com/TheLarkInn/angular2-template-loader
         */
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ng-router-loader',
              options: {
                aot: isProd,
                debug: false
              }
            },
            'awesome-typescript-loader?declaration=false',
            'angular2-template-loader'
          ],
          exclude: [
            $$.root('e2e'),
            /\.(spec|e2e)\.ts$/
          ]
        },

        /**
         * Json loader support for *.json files.
         *
         * See: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          use: 'json-loader'
        },

        /**
         * Raw loader support for *.css files
         * Returns file content as string
         *
         * See: https://github.com/webpack/raw-loader
         */
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
          exclude: [$$.root(`${settings.paths.temp.build.root}/index.html`)]
        },

        /**
         * Raw loader support for *.html
         * Returns file content as string
         *
         * See: https://github.com/webpack/raw-loader
         */
        {
          test: /\.html$/,
          use: 'html-loader',
          exclude: [$$.root(`${settings.paths.temp.build.root}/index.html`)]
        },

        /**
         * File loader for supporting images, for example, in CSS files.
         */
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: 'file-loader?name=assets/[name].[chunkhash].[ext]'
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
        'ENV': JSON.stringify(options.env),
        'process.env': {
          'ENV': JSON.stringify(options.env),
          'NODE_ENV': JSON.stringify(options.env),
          'HOST': JSON.stringify(settings.host),
          'PORT': JSON.stringify(settings.port)
        }
      }),

      /**
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
      new checkerPlugin(),

      /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * See: https://github.com/angular/angular/issues/11580
       */
      new contextReplacementPlugin(
        // fix the warning in ./~/@angular/core/src/linker/system_js_ng_module_factory_loader.js
        /angular(\\|\/)core(\\|\/)@angular/,
        $$.root(settings.paths.temp.build.root)
      ),

      /**
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       *
       * Copies project static assets.
       *
       * See: https://www.npmjs.com/package/copy-webpack-plugin
       */
      new copyWebpackPlugin([
        {
          from: `${$$.root(settings.paths.temp.build.assets)}/config.json`,
          to: './config.json'
        },
        {
          from: `${$$.root(settings.paths.temp.build.assets)}/i18n/en.json`,
          to: './i18n/en.json'
        },
        {
          from: `${$$.root(settings.paths.temp.build.assets)}/i18n/tr.json`,
          to: './i18n/tr.json'
        }
      ]),

      /**
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
      new htmlWebpackPlugin({
        template: $$.root(`${settings.paths.temp.build.root}/index.html`),
        chunksSortMode: 'dependency'
      }),

      /**
       * Plugin: ScriptExtHtmlWebpackPlugin
       * Description: Enhances html-webpack-plugin functionality
       * with different deployment options for your scripts including:
       *
       * See: https://github.com/numical/script-ext-html-webpack-plugin
       */
      new scriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new loaderOptionsPlugin({
        options: {
          tslint: {
            failOnHint: false
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
  };
};
