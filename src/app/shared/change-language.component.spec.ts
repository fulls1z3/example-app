// angular
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { ConfigService } from '@ngx-config/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MetaLoader, MetaModule } from '@ngx-meta/core';

// testing
import { MOCK_CORE_PROVIDERS } from '../../testing/core';
import { MOCK_ROUTER_PROVIDERS } from '../../testing/router/testing';

// module
import { metaFactory, translateFactory } from '../app.module';

// routes & components
import { ChangeLanguageComponent } from './change-language.component';

describe('example-app', () => {
  describe('shared: ChangeLanguageComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpModule,
          RouterTestingModule,
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
        declarations: [ChangeLanguageComponent],
        providers: [
          MOCK_CORE_PROVIDERS,
          MOCK_ROUTER_PROVIDERS
        ]
      }).compileComponents();
    }));

    it('should build without a problem w/`languageCode` param', async(() => {
      const fixture = TestBed.createComponent(ChangeLanguageComponent);
      const route = fixture.debugElement.injector.get(ActivatedRoute) as any;
      route.testParams = {languageCode: 'en'};

      fixture.detectChanges();

      expect(fixture.nativeElement).toBeTruthy();
    }));

    it('should build without a problem w/o `languageCode` param', async(() => {
      const fixture = TestBed.createComponent(ChangeLanguageComponent);
      const route = fixture.debugElement.injector.get(ActivatedRoute) as any;
      route.testParams = {languageCode: ''};

      fixture.detectChanges();

      expect(fixture.nativeElement).toBeTruthy();
    }));
  });
});
