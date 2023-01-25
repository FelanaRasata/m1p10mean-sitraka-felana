import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {SignUpComponent} from './modules/public/page/sign-up/sign-up.component'
import {SignInComponent} from './modules/public/page/sign-in/sign-in.component'
import {DataStorageResolver} from "./modules/shared/core/resolver/data-storage/data-storage.resolver";
import {LayoutComponent} from "./layout/layout.component";
import {AuthenticationGuard} from "./modules/public/core/guards/authentication/authentication.guard";


const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign_in',
        pathMatch: 'full',
    },
    {
        path: 'sign_up',
        component: SignUpComponent,
    },
    {
        path: 'sign_in',
        component: SignInComponent,
    },
    {
        path: 'back_office/sign_in',
        component: SignInComponent,
    },
    {
        path: '',
        resolve: {data: DataStorageResolver},
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
            }
        ],
        canActivateChild: [AuthenticationGuard]

    },
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRouting {
}
