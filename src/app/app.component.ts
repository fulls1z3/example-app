// angular
import { Component, OnInit } from '@angular/core';

// libs
import * as _ from 'lodash';
import { ConfigService } from '@nglibs/config';
import { MetaService } from '@nglibs/meta';
import { I18NRouterService } from '@nglibs/i18n-router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;

  constructor(private readonly config: ConfigService,
              private readonly translate: TranslateService,
              private readonly meta: MetaService,
              private readonly i18nRouter: I18NRouterService) {
  }

  ngOnInit(): void {
    this.title = '@nglibs/example-app works!';
    const defaultLanguage = this.config.getSettings().i18n.defaultLanguage;

    // add available languages & set default language
    this.translate.addLangs(<Array<string>>_.map(this.config.getSettings().i18n.availableLanguages, 'code'));
    this.translate.setDefaultLang(defaultLanguage.code);

    this.meta.setTag('og:locale', defaultLanguage.culture);

    this.i18nRouter.init();

    this.setLanguage(defaultLanguage);
  }

  private setLanguage(language: any): void {
    this.translate.use(language.code).subscribe(() => {
      this.meta.setTag('og:locale', language.culture);
    });

    this.i18nRouter.changeLanguage(language.code);
  }
}
