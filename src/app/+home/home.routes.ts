// angular
import { Routes } from '@angular/router';

// module
import { HomeComponent } from './home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            metadata: {
                title: '',
                override: true,
                description: 'Welcome to @nglibs/example'
            }
        }
    }
];
