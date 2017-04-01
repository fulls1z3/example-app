// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// libs
import { MetaService } from '@nglibs/meta';
import { I18NRouterService } from '@nglibs/i18n-router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'i18n-change-language',
  template: ''
})
export class ChangeLanguageComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute,
              private readonly translate: TranslateService,
              private readonly meta: MetaService,
              private readonly i18nRouter: I18NRouterService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const languageCode = params['languageCode'];

      if (!!languageCode)
        this.setLanguage(languageCode);

      this.router.navigate(['/']);
    });
  }

  private setLanguage(languageCode: string): void {
    this.translate.use(languageCode).subscribe(() => {
      // refresh meta tags
      this.meta.refresh();
      this.meta.setTag('og:locale', languageCode, false);
    });

    this.i18nRouter.changeLanguage(languageCode);
  }
}
