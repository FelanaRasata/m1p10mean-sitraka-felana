import { Injectable } from '@angular/core'
import { API_ENDPOINTS, CUSTOMER_ROUTES, KEYS, RouteInfo } from '../../config/constants'
import { EUrlPart, EUserType } from '../../models/global/static_enums'
import { BehaviorSubject, Observable } from 'rxjs'
import { IUser } from '../../models/schemas/users.schema'
import { ApiService } from '../api/api.service'
import { NotificationService } from '../notification/notification.service'
import { Router } from '@angular/router'
import { IResponseType, ISignInResponse } from '../../models/global/global'
import { baseUrl, decrypt, encrypt, isEmpty } from '../utils/utils'
import { ISignInRequirements, ISignUpRequirements } from '../../models/api/user.dto'


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  get defaultRoutes(): RouteInfo[] {

    switch (this.getUrlPart()) {

      case EUrlPart.CUS:
        return CUSTOMER_ROUTES

      case EUrlPart.FIM:
        return CUSTOMER_ROUTES

      case EUrlPart.WOM:
        return CUSTOMER_ROUTES

      default:
        return []

    }

  }


  public onlineUser: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null)


  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {

  }


  getLoggedInUser(): Observable<boolean> {

    return new Observable<boolean>(subscriber => {

      this.apiService.get<IResponseType<IUser>>(baseUrl(API_ENDPOINTS.session.logged_in_user)).subscribe((result) => {

        if (result.status != 200) {

          this.notificationService.alert('No user found', result.message, 'error')
          subscriber.next(false)

        } else {

          this.onlineUser.next(result.data)
          subscriber.next(true)

        }

        subscriber.complete()

      })

    })

  }


  signIn(signInData: ISignInRequirements): Observable<boolean> {

    return new Observable<boolean>(subscriber => {

      this.apiService.post<ISignInResponse>(baseUrl(API_ENDPOINTS.session.sign_in), {...signInData}).subscribe((result) => {

        if (result.status != 200) {

          this.notificationService.alert('Login failed', result.message, 'error')
          subscriber.next(false)
          subscriber.complete()

        } else {

          switch (result.data!.user_type) {

            case EUserType.CUS:
              this.setUrlPart(EUrlPart.CUS)
              break

            default:
              subscriber.next(false)
              subscriber.complete()
              break

          }

          if (isEmpty(result.data!.token)) {

            subscriber.next(false)
            subscriber.complete()

          } else {

            this.setToken(result.data!.token)
            subscriber.next(true)
            subscriber.complete()


          }

        }

      })

    })

  }


  register(signUpData: ISignUpRequirements): Observable<boolean> {

    return new Observable<boolean>(subscriber => {

      this.apiService.post<ISignInResponse>(baseUrl(API_ENDPOINTS.session.sign_up), {...signUpData}).subscribe((result) => {

        if (result.status != 200) {

          this.notificationService.alert('Login failed', result.message, 'error')
          subscriber.next(false)

        } else {

          console.log(result)

          if (result.data?.user_type == EUserType.CUS || !isEmpty(result.data?.token)) {

            this.setUrlPart(EUrlPart.CUS)
            this.setToken(result.data!.token)
            subscriber.next(true)

          } else {

            subscriber.next(false)

          }

        }

        subscriber.complete()

      })

    })

  }


  signOut(): Observable<boolean> {

    return new Observable<boolean>((subscriber) => {

      this.removeToken()
      this.removeUrlPart()

      this.router.navigate(['sign_in']).then((status) => {

        subscriber.next(status)
        subscriber.complete()

      })

    })

  }


  getToken(): string | null {

    return localStorage.getItem(KEYS.token_key)

  }


  setToken(token: string): void {

    localStorage.removeItem(KEYS.token_key)
    localStorage.setItem(KEYS.token_key, token)

  }


  removeToken(): void {

    localStorage.removeItem(KEYS.token_key)

  }


  getUrlPart(): string {

    try {

      const value: string | null = localStorage.getItem(KEYS.url_part_key)

      return isEmpty(value) ? '' : decrypt(value!)

    } catch (e) {

      return ''

    }

  }


  setUrlPart(urlPath: string): void {

    localStorage.removeItem(KEYS.url_part_key)
    localStorage.setItem(KEYS.url_part_key, encrypt(urlPath))

  }


  removeUrlPart(): void {

    localStorage.removeItem(KEYS.url_part_key)

  }

}
