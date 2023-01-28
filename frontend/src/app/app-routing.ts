import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SignUpComponent } from './modules/public/page/sign-up/sign-up.component'
import { SignInComponent } from './modules/public/page/sign-in/sign-in.component'
import { AuthenticationGuard } from './modules/public/core/guards/authentication/authentication.guard'
import { NotFoundComponent } from './modules/public/page/not-found/not-found.component'


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
        path: 'workshop/sign_in',
        component: SignInComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'finance/sign_in',
        component: SignInComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
            },
        ],
    },{
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full',
    },
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRouting {
}
