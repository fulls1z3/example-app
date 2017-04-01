# @nglibs example application

Example application utilizing @nglibs utilities, showcasing common patterns and best practices. You can find the live app [here](https://nglibs-example-app.azurewebsites.net).

This application uses [@nglibs/config](https://github.com/nglibs/config) to fetch the configuration settings loaded during application initialization; [@nglibs/meta](https://github.com/nglibs/meta) to update the page title & meta tags every time the route changes; [@nglibs/i18n-router](https://github.com/nglibs/i18n-router) to intercept Router initialization and translates each `path` and `redirectTo` property of Routes; [@nglibs/i18n-router-config-loader](https://github.com/nglibs/i18n-router-config-loader) to load route translations using `@nglibs/config`.

Built with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0.

#### WARNING

**`@nglibs/i18n-router`** does not work with **`@angular-cli`** (*yet*), and giving the following error during [AoT compilation]:

> `ERROR in Cannot read property 'loadChildren' of undefined`

This issue is caused by the `ngtools_impl` located in the package `@angular/compiler-cli`.

The **`@ngtools/webpack`** forces routes to be *static*, to facilitate code splitting (*for lazy-loaded modules*) by webpack. However, **route providing** by `useFactory` are not supported. You can track the actual status of this issue at the following URLs:

- https://github.com/nglibs/i18n-router/issues/2
- https://github.com/angular/angular/issues/15305

On the other hand, the [ng-router-loader] (together with `awesome-typescipt-loader`) is safe to go with - it compiles without a problem. There's an overhead: you need to **manually** configure **build tools** (*dev/prod sever, task runners, webpack, etc*). You can use [@nglibs/example-app] as a **reference** (*which is an officially maintained example application showcasing best practices for [@nglibs] utilities*).

If you really need to stick to **`@angular-cli`**, you can use the following workaround, by changing the contents of `/node_modules/@angular/compiler-cli/src/ngtools_impl.js` as described below:

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

## Included

- [@nglibs/config](https://github.com/nglibs/config)
- [@nglibs/meta](https://github.com/nglibs/meta)
- [@nglibs/i18n-router](https://github.com/nglibs/i18n-router)
- [@nglibs/i18n-router-config-loader](https://github.com/nglibs/i18n-router-config-loader)

## Quick start
```
# clone the repo
git clone https://github.com/nglibs/example-app.git

# change directory to repo
cd example-app

# Use npm or yarn to install the dependencies:
npm install

# start the server
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

**NOTE**: The above setup instructions assume you have added local npm bin folders to your path. If this is not the case you will need to install the angular-cli globally.

## License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[@nglibs]: https://github.com/nglibs
[@nglibs/example-app]: https://github.com/nglibs/example-app
[@nglibs/config]: https://github.com/nglibs/config
[@nglibs/meta]: https://github.com/nglibs/meta
[@nglibs/i18n-router]: https://github.com/nglibs/i18n-router
[@nglibs/i18n-router-config-loader]: https://github.com/nglibs/i18n-router-config-loader
[ng-router-loader]: https://github.com/shlomiassaf/ng-router-loader
[forRoot]: https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
[AoT compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[Burak Tasci]: http://www.buraktasci.com
