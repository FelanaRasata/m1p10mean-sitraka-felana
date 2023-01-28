import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { UserService } from '../../services/user/user.service'
import { NotificationService } from '../../services/notification/notification.service'
import { Router } from '@angular/router'


@Injectable()
export class GeneralErrorHandlerInterceptor implements HttpInterceptor {

    constructor(
        private userService: UserService,
        private notificationService: NotificationService,
        private router: Router,
    ) {
    }


    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {

            let errorMsg = ''

            if (error.status === 401) {

                this.notificationService.alert('Not authenticated', 'You must sign in to continue.', 'error')
                this.router.navigate([''])

            } else {

                if (error.error instanceof ErrorEvent) {

                    this.notificationService.alert('Unknown error', 'There is an unknown issue, please check your internet connection.', 'error')
                    console.error('this is client side error')
                    errorMsg = `Error: ${error.error.message}`

                } else if (error.status >= 500 && error.status <= 599) {

                    console.error('this is server side error')
                    errorMsg = `Error Code: ${error.status},  Message: ${error.message}`

                }

                this.notificationService.alert('Error', 'An error occurred, please try again later.', 'error')

            }

            return throwError(errorMsg)

        }))
    }

}
