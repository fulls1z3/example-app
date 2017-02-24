// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// libs
import * as _ from 'lodash';
import { ConfigModule, ConfigLoader, ConfigHttpLoader, ConfigService } from '@nglibs/config';
import { MetaModule, MetaLoader, MetaStaticLoader } from '@nglibs/meta';
import { I18NRouterModule, I18NRouterLoader, I18N_ROUTER_PROVIDERS, RAW_ROUTES } from '@nglibs/i18n-router';
import { I18NRouterConfigLoader } from '@nglibs/i18n-router-config-loader';

// module
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { ChangeLanguageComponent } from './change-language.component';

// for AoT compilation
export function configFactory(http: Http): ConfigLoader {
  return new ConfigHttpLoader(http, './dist/config.json');
}

export function metaFactory(config: ConfigService): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: config.getSettings().seo.pageTitlePositioning,
    pageTitleSeparator: config.getSettings().seo.pageTitleSeparator,
    applicationName: config.getSettings().system.applicationName,
    applicationUrl: config.getSettings().system.applicationUrl,
    defaults: {
      title: config.getSettings().seo.defaultPageTitle,
      description: config.getSettings().seo.defaultMetaDescription,
      'generator': '@nglibs',
      'og:site_name': config.getSettings().system.applicationName,
      'og:type': 'website',
      'og:locale': config.getSettings().i18n.defaultLanguage.culture,
      'og:locale:alternate': _.map(config.getSettings().i18n.availableLanguages, 'culture').toString()
    }
  });
}

export function i18nRouterFactory(config: ConfigService, rawRoutes: Routes): I18NRouterLoader {
  return new I18NRouterConfigLoader(config, rawRoutes, 'routes');
}

@NgModule({
  declarations: [
    AppComponent,
    ChangeLanguageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ConfigModule.forRoot({ provide: ConfigLoader, useFactory: (configFactory), deps: [Http] }),
    MetaModule.forRoot({ provide: MetaLoader, useFactory: (metaFactory), deps: [ConfigService] }),
    I18NRouterModule.forRoot(routes, [
      { provide: I18NRouterLoader, useFactory: (i18nRouterFactory), deps: [ConfigService, RAW_ROUTES] }
    ])
  ],
  providers: [I18N_ROUTER_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
