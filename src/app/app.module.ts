// angular
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// libs
import { ConfigLoader, ConfigModule, ConfigService } from '@ngx-config/core';
import { ConfigHttpLoader } from '@ngx-config/http-loader';
import { MetaLoader, MetaModule, MetaStaticLoader } from '@ngx-meta/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// routes & components
import { ChangeLanguageComponent } from './shared/change-language.component';
import { routes } from './app.routes';
import { AppComponent } from './app.component';

// for AoT compilation
export function configFactory(http: Http): ConfigLoader {
  return new ConfigHttpLoader(http, './assets/config.local.json');
}

export function metaFactory(config: ConfigService, translate: TranslateService): MetaLoader {
  return new MetaStaticLoader({
    callback: (key: string) => translate.get(key),
    pageTitlePositioning: config.getSettings('seo.pageTitlePositioning'),
    pageTitleSeparator: config.getSettings('seo.pageTitleSeparator'),
    applicationName: config.getSettings('system.applicationName'),
    applicationUrl: config.getSettings('system.applicationUrl'),
    defaults: {
      title: config.getSettings('seo.defaultPageTitle'),
      description: config.getSettings('seo.defaultMetaDescription'),
      generator: 'ng-seed',
      'og:site_name': config.getSettings('system.applicationName'),
      'og:type': 'website',
      'og:locale': config.getSettings('i18n.defaultLanguage.culture'),
      'og:locale:alternate': config.getSettings('i18n.availableLanguages')
        .map((language: any) => language.culture).toString()
    }
  });
}

export function translateFactory(http: Http): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    ChangeLanguageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ConfigModule.forRoot({
      provide: ConfigLoader,
      useFactory: configFactory,
      deps: [Http]
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [Http]
      }
    }),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: metaFactory,
      deps: [ConfigService, TranslateService]
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
