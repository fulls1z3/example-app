// angular
import { async, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { ConfigService } from '@ngx-config/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MetaLoader, MetaModule } from '@ngx-meta/core';

// testing
import { MOCK_CORE_PROVIDERS } from '../testing/core';

// module
import { metaFactory, translateFactory } from './app.module';

// components
import { AppComponent } from './app.component';

describe('example-app', () => {
  describe('AppComponent', () => {
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
        declarations: [AppComponent],
        providers: [
          MOCK_CORE_PROVIDERS
        ]
      }).compileComponents();
    }));

    it('should build without a problem', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const instance = fixture.debugElement.componentInstance;
      expect(instance).toBeTruthy();
    }));

    it('should have as title `fulls1z3\'s example app`', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();

      const instance = fixture.debugElement.componentInstance;
      expect(instance.title).toEqual('fulls1z3\'s example app');
    }));

    it('should render title in a h1 tag', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const el = fixture.debugElement.nativeElement;
      expect(el.querySelector('h1').textContent).toContain('fulls1z3\'s example app');
    }));
  });
});
