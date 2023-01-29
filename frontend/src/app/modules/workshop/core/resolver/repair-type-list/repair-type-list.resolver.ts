import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { RepairTypeService } from '../../../../shared/core/services/repair-type/repair-type.service'


@Injectable({
    providedIn: 'root'
})
export class RepairTypeListResolver implements Resolve<boolean> {

    constructor(
        private repairTypeService: RepairTypeService
    ) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable<boolean>(subscriber => {

            this.repairTypeService
                .getRepairTypes(
                    {
                        page: 1,
                        limit: 10,
                        sort: 'name'
                    }
                )
                .subscribe((status) => {

                    subscriber.next(status)
                    subscriber.complete()

                })


        })
    }
}
