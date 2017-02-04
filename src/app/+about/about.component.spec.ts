// angular
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// routes & components
import { AboutComponent } from './about.component';

describe('example-app', () => {
  describe('+about: AboutComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        declarations: [AboutComponent]
      }).compileComponents();
    }));

    it('should build without a problem', async(() => {
      const fixture = TestBed.createComponent(AboutComponent);
      const instance = fixture.debugElement.componentInstance;
      expect(instance).toBeTruthy();
    }));
  });
});
