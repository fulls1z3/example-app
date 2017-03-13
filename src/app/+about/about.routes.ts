// angular
import { Routes } from '@angular/router';

// module
import { AboutComponent } from './about.component';
import { AboutUsComponent } from './about-us.component';
import { AboutBananaComponent } from './about-banana.component';
import { AboutApplePearComponent } from './about-apple-pear.component';

export const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: {
      meta: {
        title: 'About',
        description: 'This page provides a dummy overview of nothing'
      }
    }
  },
  {
    path: 'us/:topicId',
    component: AboutUsComponent,
    data: {
      meta: {
        title: 'About us',
        description: 'Yeah, I think this page tells something about us'
      }
    }
  },
  {
    path: 'banana',
    component: AboutBananaComponent,
    data: {
      meta: {
        title: 'Banana republic',
        description: 'If your life sucks, start a new one in Banana Republic'
      }
    }
  },
  {
    path: 'apple/:fruitId/pear',
    component: AboutApplePearComponent,
    data: {
      meta: {
        title: 'Apple or pear',
        description: 'I want an apple but you give me a pear, shame on you'
      }
    }
  }
];
