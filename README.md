# fulls1z3's example application
> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

**`fulls1z3/example-app`** is a sample project for Angular apps following the common patterns and [best practices](https://angular.io/styleguide)
in file and application organization, providing the following features:

- [x] Ready-to-go build system using [angular-cli].
- [x] Managing the type definitions using [@types].
- [x] Production and development modes.
- [x] [AoT compilation] for rapid page loads on production builds (*using [@ngtools/webpack]*).
- [x] [Lazy loading] of modules.
- [x] Uses [ngx-config] for configuration management.
- [ ] Uses [ngx-auth] for basic JWT-based authentication.
- [x] Uses [ngx-translate] for i18n support.
- [x] Uses [ngx-meta] for SEO (*title, meta tags, and Open Graph tags for social sharing*).
- [ ] Uses [ngx-i18n-router] for localized routes.
- [x] Unit tests with [Jasmine] and [Karma], including code coverage via [Istanbul].
- [x] End-to-end tests with [Protractor].
- [x] [angular-tslint-rules] as configuration preset for [TSLint] and [codelyzer].

> Built with [angular-cli].

You can find the live app [here](https://fulls1z3.github.io/example-app).

## Quick start
```
# clone the repo
git clone https://github.com/fulls1z3/example-app.git

# change directory to repo
cd example-app

# Use npm or yarn to install the dependencies:
npm install

# run tslint
npm run lint

# start the server
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

**NOTE**: The above setup instructions assume you have added local npm bin folders to your path. If this is not the case you will need to install the [angular-cli] globally.

## Contributing
If you want to file a bug, contribute some code, or improve documentation, please read up on the following contribution guidelines:
- [Issue guidelines](CONTRIBUTING.md#submit)
- [Contributing guidelines](CONTRIBUTING.md)
- [Coding rules](CONTRIBUTING.md#rules)
- [Change log](CHANGELOG.md)

## License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[angular-cli]: https://github.com/angular/angular-cli
[@types]: https://www.npmjs.com/~types
[AoT compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[@ngtools/webpack]: https://www.npmjs.com/package/@ngtools/webpack
[Lazy loading]: https://angular-2-training-book.rangle.io/handout/modules/lazy-loading-module.html
[ngx-config]: https://github.com/fulls1z3/ngx-config
[ngx-config]: https://github.com/fulls1z3/ngx-config
[ngx-auth]:  https://github.com/fulls1z3/ngx-auth
[ngx-translate]: https://github.com/ngx-translate/core
[ngx-meta]: https://github.com/fulls1z3/ngx-meta
[ngx-i18n-router]: https://github.com/fulls1z3/ngx-i18n-router
[Jasmine]: https://jasmine.github.io
[Karma]: https://karma-runner.github.io
[Istanbul]: https://github.com/webpack-contrib/istanbul-instrumenter-loader
[Protractor]: http://www.protractortest.org
[angular-tslint-rules]: https://github.com/fulls1z3/angular-tslint-rules
[TSLint]: https://github.com/palantir/tslint
[codelyzer]: https://github.com/mgechev/codelyzer
[Burak Tasci]: http://www.buraktasci.com
