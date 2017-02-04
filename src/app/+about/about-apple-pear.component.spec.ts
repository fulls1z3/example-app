// angular
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// routes & components
import { AboutApplePearComponent } from './about-apple-pear.component';

describe('example-app', () => {
  describe('+about: AboutApplePearComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        declarations: [AboutApplePearComponent]
      }).compileComponents();
    }));

    it('should build without a problem', async(() => {
      const fixture = TestBed.createComponent(AboutApplePearComponent);
      const instance = fixture.debugElement.componentInstance;
      expect(instance).toBeTruthy();
    }));
  });
});
