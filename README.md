# ng-seed/spa
> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

**`ng-seed/spa`** is a seed project for Angular apps following the common patterns and [best practices](https://angular.io/styleguide) in file and application organization, providing the following features:

- Ready-to-go build system using [angular-cli].
- Production and development modes.
- [AoT compilation] for rapid page loads on production builds (*using [@ngtools/webpack]*).
- SCSS compilation support.
- Lazy loading of modules.
- Uses [@ngx-config] for configuration management.
- Uses [@ngx-cache] for caching.
- Uses [@ngx-translate] and [@ngx-i18n-router] for i18n support.
- Uses [@ngx-meta] for SEO.
- ~Sample unit tests with Jasmine and Karma including code coverage via istanbul.~
- ~End-to-end tests with Protractor.~
- [angular-tslint-rules] as configuration preset for [TSLint] and [codelyzer].
- Managing the type definitions using @types.

> Built with [angular-cli] version 1.0.0.

You can find the live app [here](https://ng-seed-spa.azurewebsites.net).

#### WARNING
[@ngx-i18n-router] does not work with [angular-cli] (*yet*), and giving the following error during [AoT compilation]:

> `ERROR in Cannot read property 'loadChildren' of undefined`

[@ngx-i18n-router] injects routes with the `ROUTES` DI token using the `useFactory` property. However [@ngtools/webpack] forces routes to be *static*, and prevents code splitting (*for lazy-loaded modules*) by third parties.

This issue is caused by the `ngtools_impl` located in the package `@angular/compiler-cli`.

You can track the actual status of this issue at the following URLs:
- https://github.com/ngx-i18n-router/core/issues/2
- https://github.com/angular/angular/issues/15305

On the other hand, the [ng-router-loader] (*together with [awesome-typescipt-loader]*) is safe to go with - it compiles without a problem. There's an overhead: you need to **manually** configure **build tools** (*dev/prod sever, task runners, [webpack], etc*).

If you really need to stick to [angular-cli], you can use the following workaround, by changing the contents of `/node_modules/@angular/compiler-cli/src/ngtools_impl.js` as described below:

- **Method name:** `_collectRoutes`
- **Line number:** 139
- **Replacement:** comment the line containing `return routeList.concat(p.useValue);`, and replace with:
```JavaScript
if (p.useFactory != null) {
  return routeList.concat(p.useFactory);
} else {
  return routeList.concat(p.useValue);
}
```

#### [ngtools_impl.js](https://gist.github.com/fulls1z3/ca7541eeccc5b195f4854ff39d322d0e#file-ngtools_impl-js-L138)
```JavaScript
function _collectRoutes(providers, reflector, ROUTES) {
  return providers.reduce(function (routeList, p) {
    if (p.provide === ROUTES) {
      // return routeList.concat(p.useValue);
      if (p.useFactory != null) {
        return routeList.concat(p.useFactory);
      } else {
        return routeList.concat(p.useValue);
      }
    }
    else if (Array.isArray(p)) {
      return routeList.concat(_collectRoutes(p, reflector, ROUTES));
    }
    else {
      return routeList;
    }
  }, []);
}
```

## Quick start
```
# clone the repo
git clone https://github.com/ng-seed/spa.git

# change directory to repo
cd spa

# checkout to `angular-cli` branch
git checkout angular-cli

# Use npm or yarn to install the dependencies:
npm install

# start the server
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

**NOTE**: The above setup instructions assume you have added local npm bin folders to your path. If this is not the case you will need to install the [angular-cli] globally.

## License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[angular-cli]: https://github.com/angular/angular-cli
[AoT compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[webpack]: http://webpack.github.io
[@ngtools/webpack]: https://www.npmjs.com/package/@ngtools/webpack
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
[ng-router-loader]: https://github.com/shlomiassaf/ng-router-loader
[awesome-typescipt-loader]: https://github.com/s-panferov/awesome-typescript-loader
[Burak Tasci]: http://www.buraktasci.com
