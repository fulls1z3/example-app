# @nglibs example application

Example application utilizing @nglibs utilities, showcasing common patterns and best practices. You can find the live app [here](https://nglibs-example-app.azurewebsites.net).

This application uses [@nglibs/config](https://github.com/nglibs/config) to fetch the configuration settings loaded during application initialization; [@nglibs/meta](https://github.com/nglibs/meta) to update the page title & meta tags every time the route changes; [@nglibs/i18n-router](https://github.com/nglibs/i18n-router) to intercept Router initialization and translates each `path` and `redirectTo` property of Routes; [@nglibs/i18n-router-config-loader](https://github.com/nglibs/i18n-router-config-loader) to load route translations using `@nglibs/config`.

Built with `@angular v4.0.0`, bundled with `gulp v4.0` and `webpack v2.3.2`.

## Included

- [@nglibs/config]
- [@nglibs/meta]
- [@nglibs/i18n-router]
- [@nglibs/i18n-router-config-loader]
- [@ngx-translate](https://github.com/ngx-translate/core)

## Prerequisites
Packages in this example app depend on `@angular v4.0.0`. Older versions contain outdated dependencies, might produce errors.

Also, please ensure that you are using **`Typescript v2.2.2`** or higher.

## Installing

```
# clone the repo
git clone https://github.com/nglibs/example-app.git
cd example-app

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
