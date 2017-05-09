// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// libs
import { I18NRouterModule } from '@ngx-i18n-router/core';

// routes & components
import { routes } from './home.routes';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    I18NRouterModule.forChild(routes, 'home')
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
