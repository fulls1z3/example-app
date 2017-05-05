# ng-seed/spa
> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

**`ng-seed/spa`** is a seed project for Angular apps following the common patterns and [best practices](https://angular.io/styleguide) in file and application organization, providing the following features:

- Ready-to-go build system using [gulp] and [Webpack] for working with [TypeScript].
- Adjustable build configuration via `json` file (`./config/build-config.json`).
- Production and development modes.
- [Webpack DLL]s to speed up development builds.
- [AoT compilation] for rapid page loads on production builds (*using **`ngc`***).
- Tree-shaking the production builds with [fulls1z3/webpack].
- ~Hot Module Replacement with [Webpack] and [@angularclass/hmr] and [@angularclass/hmr-loader].~
- Both inline and external SCSS compilation.
- Lazy loading of modules.
- Uses [@ngx-config] for configuration management.
- Uses [@ngx-cache] for caching.
- Uses [@ngx-translate] and [@ngx-i18n-router] for i18n support.
- Uses [@ngx-meta] for SEO.
- ~Sample unit tests with Jasmine and Karma including code coverage via istanbul.~
- ~End-to-end tests with Protractor.~
- [angular-tslint-rules] as configuration preset for [TSLint] and [codelyzer].
- Managing the type definitions using @types.

> Built with `@angular v2.4.0`, bundled with `gulp v4.0` and `webpack v2.5.0`.

You can find the live app [here](https://ng-seed-spa.azurewebsites.net).

## Prerequisites
Packages in this seed project depend on `@angular v2.4.0`. Older versions contain outdated dependencies, might produce errors.

Also, please ensure that you are using **`Typescript v2.1.6`** or higher.

## Installing
```
# clone the repo
git clone https://github.com/ng-seed/spa.git
cd spa

# checkout to `angular-2.4.x` branch
git checkout angular-2.4.x

# use npm (or yarn) to install the dependencies
npm install

# dev build
npm run build:dev
# prod build
npm run build:prod

# start the server
npm run serve
```

Navigate to `http://localhost:1337` in your browser.

## License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[gulp]: http://gulpjs.com
[Webpack]: http://webpack.github.io
[TypeScript]: https://github.com/Microsoft/TypeScript
[Webpack DLL]: https://robertknight.github.io/posts/webpack-dll-plugins
[AoT compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[fulls1z3/webpack]: https://github.com/fulls1z3/webpack
[@angularclass/hmr]: https://github.com/angularclass/angular2-hmr
[@angularclass/hmr-loader]: https://github.com/AngularClass/angular2-hmr-loader
[@ngx-config]: https://github.com/ngx-config/core
[@ngx-cache]: https://github.com/ngx-cache/core
[@ngx-translate]: https://github.com/ngx-translate/core
[@ngx-i18n-router]: https://github.com/ngx-i18n-router/core
[@ngx-meta]: https://github.com/ngx-meta/core
[Jasmine]: https://jasmine.github.io
[Karma]: https://karma-runner.github.io
[Istanbul]: https://github.com/webpack-contrib/istanbul-instrumenter-loader
[Protractor]: http://www.protractortest.org
[angular-tslint-rules]: https://github.com/fulls1z3/angular-tslint-rules
[TSLint]: https://github.com/palantir/tslint
[codelyzer]: https://github.com/mgechev/codelyzer
[Burak Tasci]: http://www.buraktasci.com
