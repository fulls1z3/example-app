// angular
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// routes & components
import { HomeComponent } from './home.component';

describe('example-app', () => {
  describe('+home', () => {
    describe('HomeComponent', () => {
      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
            RouterTestingModule
          ],
          declarations: [HomeComponent]
        }).compileComponents();
      }));

      it('should build without a problem', async(() => {
        const fixture = TestBed.createComponent(HomeComponent);
        const instance = fixture.debugElement.componentInstance;
        expect(instance).toBeTruthy();
      }));
    });
  });
});
