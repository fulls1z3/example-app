# @nglibs example application

Example application utilizing @nglibs utilities, showcasing common patterns and best practices. You can find the live app [here](https://nglibs.github.io/example-app/).

This application uses [@nglibs/config](https://github.com/nglibs/config) to fetch the configuration settings loaded during application initialization; [@nglibs/meta](https://github.com/nglibs/meta) to update the page title & meta tags every time the route changes; [@nglibs/i18n-router](https://github.com/nglibs/i18n-router) to intercept Router initialization and translates each `path` and `redirectTo` property of Routes; [@nglibs/i18n-router-config-loader](https://github.com/nglibs/i18n-router-config-loader) to load route translations using `@nglibs/config`.

Built with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.30.

#### NOTICE
**`@nglibs/i18n-router`** does not work with **`@angular-cli`** (*yet*), and giving the following error during [AoT compilation]:

> `ERROR in Cannot read property 'loadChildren' of undefined`

It happens because **`@angular-cli`** uses **`@ngtools/webpack`** for [AoT compilation], expecting `RouterModule.forChild(...)` to resolve lazy-loaded modules (*with `loadChildren`*), which is replaced by `I18NRouterModule.forChild(...)` - providing routes for **feature modules** instead.

To resolve this issue, it is **highly recommended** to use [ng-router-loader]. Hence **`@angular-cli`** doesn't allow **modifying** the **webpack configuration**, you need to **manually** configure **build tools** (*dev/prod sever, task runners, webpack, etc*). You can use [@nglibs/example-app] as a **reference** (*which is an officially maintained example application showcasing best practices for [@nglibs] utilities*).

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