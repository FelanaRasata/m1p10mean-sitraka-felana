import { Injectable } from '@angular/core'
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router'
import { forkJoin, Observable, of } from 'rxjs'
import { isEmpty, reqDataToObservable } from '../../../../shared/core/services/utils/utils'
import { CarService } from '../../../../shared/core/services/car/car.service'
import { RepairService } from '../../../../shared/core/services/repair/repair.service'
import { PaginationService } from '../../../../shared/core/services/pagination/pagination.service'


@Injectable({
    providedIn: 'root'
})
export class RepairResolver implements Resolve<boolean> {
    constructor(
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

                    subscriber.next(status)
                    subscriber.complete()

                })
            }

        })

    }

}
