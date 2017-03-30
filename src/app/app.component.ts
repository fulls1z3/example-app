// angular
import { Component, OnInit } from '@angular/core';

// libs
import { ConfigService } from '@nglibs/config';
import { MetaService } from '@nglibs/meta';
import { I18NRouterService } from '@nglibs/i18n-router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '@nglibs/example-app works!';

  constructor(private config: ConfigService,
              private i18nRouter: I18NRouterService,
              private meta: MetaService) {
    i18nRouter.init();
    meta.setTag('og:locale', this.config.getSettings().i18n.defaultLanguage.culture);
  }

  ngOnInit(): void {
    this.i18nRouter.changeLanguage('en');
  }
}
