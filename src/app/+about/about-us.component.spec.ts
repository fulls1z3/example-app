// angular
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// routes & components
import { AboutUsComponent } from './about-us.component';

describe('example-app', () => {
  describe('+about: AboutUsComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        declarations: [AboutUsComponent]
      }).compileComponents();
    }));

    it('should build without a problem', async(() => {
      const fixture = TestBed.createComponent(AboutUsComponent);
      const instance = fixture.debugElement.componentInstance;
      expect(instance).toBeTruthy();
    }));
  });
});
