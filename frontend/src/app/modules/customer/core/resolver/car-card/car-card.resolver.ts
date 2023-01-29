import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { forkJoin, Observable } from 'rxjs'
import { CarService } from '../../../../shared/core/services/car/car.service'
import { isEmpty, reqDataToObservable } from '../../../../shared/core/services/utils/utils'
import { RepairService } from '../../../../shared/core/services/repair/repair.service'
import { PaginationService } from '../../../../shared/core/services/pagination/pagination.service'


@Injectable({
    providedIn: 'root',
})
export class CarCardResolver implements Resolve<boolean> {

    constructor(
        private carService: CarService,
        private repairService: RepairService,
        private paginationService: PaginationService,
    ) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return new Observable<boolean>(subscriber => {

            const carId: string = route.params['car_id']

            if (isEmpty(carId)) {

                subscriber.next(false)
                subscriber.complete()

            } else {

                this.fetchData(carId).subscribe(data => {

                    this.carService.car.next(data.car);
                    this.repairService.repairs.next(data.repairs.items)
                    this.paginationService.setPaginationData(data.repairs.paginator)

                    subscriber.next(true);
                    subscriber.complete();

                })

            }

        })

    }


    fetchData(carId: string) {

        return forkJoin({
            car: reqDataToObservable(this.carService.fetchCarById(carId)),
            repairs: reqDataToObservable(this.repairService.fetchRepairs({car: carId}, {
                page: 1,
                limit: 10,
                sort: '-createdAt',
            })),
        })

    }

}
