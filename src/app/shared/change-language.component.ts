// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// libs
import { MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-language',
  template: '&nbsp;'
})
export class ChangeLanguageComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute,
              private readonly translate: TranslateService,
              private readonly meta: MetaService,
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
      this.meta.setTag('og:locale', languageCode);
    });
  }
}
