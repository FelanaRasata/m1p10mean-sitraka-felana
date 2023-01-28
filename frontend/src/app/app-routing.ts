import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SignUpComponent } from './modules/public/page/sign-up/sign-up.component'
import { SignInComponent } from './modules/public/page/sign-in/sign-in.component'
import { AuthenticationGuard } from './modules/public/core/guards/authentication/authentication.guard'
import { NotFoundComponent } from './modules/public/page/not-found/not-found.component'
import { LayoutComponent } from './layout/layout.component'


const routes: Routes = [
    {
        path: 'sign_up',
        component: SignUpComponent,
    },
    {
        path: 'sign_in',
        component: SignInComponent,
    },
    {
        path: 'workshop/sign_in',
        component: SignInComponent,
    },
    {
        path: 'finance/sign_in',
        component: SignInComponent,
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
            },
        ],
        canActivate: [AuthenticationGuard]
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRouting {
}
