import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { baseUrl } from '../utils/utils'
import { PaginationService } from '../pagination/pagination.service'
import { NotificationService } from '../notification/notification.service'
import { ApiService } from '../api/api.service'
import { ICar } from '../../models/schemas/cars.schema'
import { API_ENDPOINTS } from '../../config/constants'
import { IResponseType } from '../../models/global/global'


@Injectable({
    providedIn: 'root',
})
export class CarService {

    cars: BehaviorSubject<ICar[]> = new BehaviorSubject<ICar[]>([])

    car: BehaviorSubject<ICar> = new BehaviorSubject<ICar>({} as ICar)


    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService,
        private paginationService: PaginationService,
    ) {
    }


    getCars(query: any, options: any): Observable<boolean> {

        return new Observable<boolean>((subscriber) => {

            this.apiService
                .get<any>(
                    baseUrl(API_ENDPOINTS.cars)
                    , {
                        params: {
                            query: JSON.stringify(query),
                            options: JSON.stringify(options),
                        },
                    },
                )
                .subscribe((result) => {

                    if (result.status != 200) {

                        this.notificationService.alert('No data found', result.message, 'error')
                        subscriber.next(false)

                    } else {

                        this.cars.next(result.data.items)
                        this.paginationService.setPaginationData(result.data.paginator)
                        subscriber.next(true)

                    }

                    subscriber.complete()

                })

        })

    }


    fetchCarById(carId: string): Observable<IResponseType<any>> {

        const url = baseUrl(`${API_ENDPOINTS.cars}/${carId}`)

        return this.apiService
            .get<any>(url)

    }


    getCarById(carId: string): Observable<boolean> {

        return new Observable<boolean>((subscriber) => {

            const url = baseUrl(`${API_ENDPOINTS.cars}/${carId}`)

            this.fetchCarById(carId)
                .subscribe((result) => {

                    if (result.status !== 200) {

                        this.notificationService.alert('No data found', result.message, 'error')
                        subscriber.next(false)

                    } else {

                        this.car.next(result.data)
                        subscriber.next(true)

                    }

                    subscriber.complete()

                })

        })

    }

}
