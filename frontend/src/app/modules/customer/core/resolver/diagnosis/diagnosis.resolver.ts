import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { forkJoin, Observable, of } from 'rxjs'
import { CarService } from '../../../../shared/core/services/car/car.service'
import { RepairService } from '../../../../shared/core/services/repair/repair.service'
import { PaginationService } from '../../../../shared/core/services/pagination/pagination.service'
import { isEmpty, reqDataToObservable } from '../../../../shared/core/services/utils/utils'


@Injectable({
    providedIn: 'root',
})
export class DiagnosisResolver implements Resolve<boolean> {

    constructor(
        private carService: CarService,
        private repairService: RepairService,
    ) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return new Observable<boolean>(subscriber => {

            const repairId: string = route.params['repair_id']

            if (isEmpty(repairId)) {

                subscriber.next(false)
                subscriber.complete()

            } else {

                this.repairService.getRepairById(repairId).subscribe((status) => {

                    if (status)
                        this.carService.car.next(this.repairService.repair.value.car)

                    subscriber.next(status)
                    subscriber.complete()

                })

            }

        })

    }

}
