import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { SessionService } from '../../../../shared/core/services/session/session.service'
import { isEmpty } from '../../../../shared/core/services/utils/utils'


@Injectable({
    providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {

    constructor(
        public sessionService: SessionService,
        public router: Router,
    ) {

    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const token: string | null = this.sessionService.getToken()

        if (isEmpty(token)) {

            this.sessionService.removeToken()
            this.sessionService.removeUrlPart()
            this.router.navigate(['sign_in'])

            return false

        }

        return true

    }

}
