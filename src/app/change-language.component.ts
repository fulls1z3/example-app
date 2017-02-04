// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// libs
import { I18NRouterService } from '@nglibs/i18n-router';

@Component({
    selector: 'i18n-change-language',
    template: ''
})
export class ChangeLanguageComponent implements OnInit {
    constructor(private readonly route: ActivatedRoute,
                private readonly i18nRouter: I18NRouterService,
                private readonly router: Router) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const languageCode = params['languageCode'];

            if (!!languageCode)
                // change language
                this.i18nRouter.changeLanguage(languageCode);

            this.router.navigate(['/']);
        });
    }
}
