import { Injectable } from '@angular/core'
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { RepairTypeService } from '../../../../shared/core/services/repair-type/repair-type.service'
import { RepairService } from '../../../../shared/core/services/repair/repair.service'


@Injectable({
    providedIn: 'root'
})
export class RepairListResolver implements Resolve<boolean> {
    constructor(
        private repairService: RepairService
    ) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable<boolean>(subscriber => {

            this.repairService
                .getRepairs(
                    {},
                    {
                        page: 1,
                        limit: 10,
                        sort: '-updatedAt'
                    }
                )
                .subscribe((status) => {

                    subscriber.next(status)
                    subscriber.complete()

                })


        })
    }
}
