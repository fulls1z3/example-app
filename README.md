# @nglibs example application

Example application utilizing @nglibs utilities, showcasing common patterns and best practices. You can find the live app [here](https://nglibs.github.io/example-app/).

This application uses [@nglibs/config](https://github.com/nglibs/config) to fetch the configuration settings loaded during application initialization; [@nglibs/metadata](https://github.com/nglibs/metadata) to update the page title & meta tags every time the route changes; [@nglibs/i18n-router](https://github.com/nglibs/i18n-router) to intercept Router initialization and translates each `path` and `redirectTo` property of Routes; [@nglibs/i18n-router-config-loader](https://github.com/nglibs/i18n-router-config-loader) to load route translations using `@nglibs/config`.

Built with `@angular v2.4.0` and `@angular/router v3.4.0`, bundled with `gulp v4.0` and `webpack v2.2.1`.

## Included

- [@nglibs/config](https://github.com/nglibs/config)
- [@nglibs/metadata](https://github.com/nglibs/metadata)
- [@nglibs/i18n-router](https://github.com/nglibs/i18n-router)
- [@nglibs/i18n-router-config-loader](https://github.com/nglibs/i18n-router-config-loader)

## Prerequisites
Verify that you are running at least node `v4.x.x` and npm `3.x.x` by running `node -v` and `npm -v` in a terminal/console window. Older versions produce errors.

You should also upgrade to a minimum version of `TypeScript 2.1.x`.

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

Navigate to `http://localhost:3000/dist` in your browser.

## License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[@nglibs]: https://github.com/nglibs
[@nglibs/example-app]: https://github.com/nglibs/example-app
[@nglibs/config]: https://github.com/nglibs/config
[@nglibs/metadata]: https://github.com/nglibs/metadata
[@nglibs/i18n-router]: https://github.com/nglibs/i18n-router
[@nglibs/i18n-router-config-loader]: https://github.com/nglibs/i18n-router-config-loader
[ng-router-loader]: https://github.com/shlomiassaf/ng-router-loader
[forRoot]: https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
[AoT compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[Burak Tasci]: http://www.buraktasci.com