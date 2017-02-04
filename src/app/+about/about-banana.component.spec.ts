// angular
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// routes & components
import { AboutBananaComponent } from './about-banana.component';

describe('example-app', () => {
  describe('+about: AboutBananaComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        declarations: [AboutBananaComponent]
      }).compileComponents();
    }));

    it('should build without a problem', async(() => {
      const fixture = TestBed.createComponent(AboutBananaComponent);
      const instance = fixture.debugElement.componentInstance;
      expect(instance).toBeTruthy();
    }));
  });
});
