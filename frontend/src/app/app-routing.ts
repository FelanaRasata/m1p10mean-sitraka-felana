import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SignUpComponent } from './modules/public/page/sign-up/sign-up.component'
import { SignInComponent } from './modules/public/page/sign-in/sign-in.component'
import { DataStorageResolver } from './modules/shared/core/resolver/data-storage/data-storage.resolver'
import { AuthenticationGuard } from './modules/public/core/guards/authentication/authentication.guard'


const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign_in',
        pathMatch: 'full',
    },
    {
        path: 'sign_up',
        component: SignUpComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'sign_in',
        component: SignInComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'back_office/sign_in',
        component: SignInComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: '',
        resolve: {data: DataStorageResolver},
        children: [
            {
                path: '',
                loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
            },
        ],
        canActivateChild: [AuthenticationGuard],

    },
    {
        path: '**',
        component: SignInComponent,
        canActivate: [AuthenticationGuard],
    }
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRouting {
}
