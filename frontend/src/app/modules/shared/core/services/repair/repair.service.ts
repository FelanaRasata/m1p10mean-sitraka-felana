import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { baseUrl } from '../utils/utils'
import { API_ENDPOINTS } from '../../config/constants'
import { ApiService } from '../api/api.service'
import { NotificationService } from '../notification/notification.service'
import { PaginationService } from '../pagination/pagination.service'
import { IRepair } from '../../models/schemas/repairs.schema'
import { IResponseType } from '../../models/global/global'


@Injectable({
    providedIn: 'root',
})
export class RepairService {

    repairs: BehaviorSubject<IRepair[]> = new BehaviorSubject<IRepair[]>([])

    repair: BehaviorSubject<IRepair> = new BehaviorSubject<IRepair>({} as IRepair)


    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService,
        private paginationService: PaginationService,
    ) {
    }


    dropOffCar(carId: string) {

        return new Observable<boolean>((subscriber) => {

            this.apiService
                .post<any>(
                    baseUrl(API_ENDPOINTS.repairs.drop_off_car.replace(':car_id', carId)),
                    {},
                )
                .subscribe((result) => {

                    if (result.status != 200) {

                        this.notificationService.alert('Process error', result.message, 'error')
                        subscriber.next(false)

                    } else {

                        const repair = result.data
                        this.repair.next(repair)
                        subscriber.next(true)

                    }

                    subscriber.complete()

                })

        })

    }


    initRepair(repairId: string, repairDto: any) {

        return new Observable<boolean>((subscriber) => {

            this.apiService
                .put<any>(
                    baseUrl(API_ENDPOINTS.repairs.init.replace(':repair_id', repairId)),
                    {
                        ...repairDto
                    },
                )
                .subscribe((result) => {

                    if (result.status != 200) {

                        this.notificationService.alert('Init error', result.message, 'error')
                        subscriber.next(false)

                    } else {

                        const repair = result.data
                        this.repair.next(repair)
                        subscriber.next(true)

                    }

                    subscriber.complete()

                })

        })

    }


    fetchRepairById(repairId: string): Observable<IResponseType<any>> {

        return this.apiService
            .get<any>(
                `${baseUrl(API_ENDPOINTS.repairs.list)}/${repairId}`
            )

    }


    getRepairById(repairId: string): Observable<boolean> {

        return new Observable<boolean>((subscriber) => {

            this.fetchRepairById(repairId)
                .subscribe((result) => {

                    if (result.status !== 200) {

                        this.notificationService.alert('No data found', result.message, 'error')
                        subscriber.next(false)

                    } else {

                        this.repair.next(result.data)
                        subscriber.next(true)

                    }

                    subscriber.complete()

                })

        })

    }


    fetchRepairs(query: any, options: any): Observable<IResponseType<any>> {

        return this.apiService
            .get<any>(
                baseUrl(API_ENDPOINTS.repairs.list)
                , {
                    params: {query: JSON.stringify(query), options: JSON.stringify(options)},
                },
            )

    }


    getRepairs(query: any, options: any): Observable<boolean> {

        return new Observable<boolean>((subscriber) => {

            this.fetchRepairs(query, options)
                .subscribe((result) => {

                    if (result.status !== 200) {

                        this.notificationService.alert('No data found', result.message, 'error')
                        subscriber.next(false)

                    } else {

                        this.repairs.next(result.data.items)
                        this.paginationService.setPaginationData(result.data.paginator)
                        subscriber.next(true)

                    }

                    subscriber.complete()

                })

        })

    }


    financeValidate(repairId: string): Observable<boolean> {

        return new Observable<boolean>((subscriber) => {

            const url = `${API_ENDPOINTS.repairs.in_progress}/${repairId}`
            this.apiService
                .put<IRepair>(
                    baseUrl(url)
                    ,
                    {}
                )
                .subscribe((result) => {

                    if (result.status != 200) {

                        this.notificationService.alert('Update failed!', result.message, 'error')
                        subscriber.next(false)
                        subscriber.complete()

                    } else {

                        this.getRepairs(
                            {},
                            {
                                page: 1,
                                limit: 10,
                                sort: '-updatedAt'
                            }
                        ).subscribe((status) => {

                            subscriber.next(status)
                            subscriber.complete()

                        })

                    }

                })

        })

    }

    /*financeValidate(repairId: string): Observable<boolean> {

        return new Observable<boolean>((subscriber) => {

            const url = `${API_ENDPOINTS.repairs.in_progress}/${repairId}`
            this.apiService
                .put<IRepair>(
                    baseUrl(url)
                    ,
                    {}
                )
                .subscribe((result) => {

                    if (result.status != 200) {

                        this.notificationService.alert('Update failed!', result.message, 'error')
                        subscriber.next(false)
                        subscriber.complete()

                    } else {

                        this.getRepairs(
                            {},
                            {
                                page: 1,
                                limit: 10,
                                sort: '-updatedAt'
                            }
                        ).subscribe((status) => {

                            subscriber.next(status)
                            subscriber.complete()

                        })

                    }

                })

        })

    }*/

}
