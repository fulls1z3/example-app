// angular
import { Routes } from '@angular/router';

// module
import { ChangeLanguageComponent } from './change-language.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: './+home/home.module#HomeModule'
            },
            {
                path: 'about',
                loadChildren: './+about/about.module#AboutModule'
            }
        ],
        data: {
            i18n: {
                isRoot: true
            }
        }
    },
    {
        path: 'change-language/:languageCode',
        component: ChangeLanguageComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
