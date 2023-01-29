import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {isEmpty} from "../../../../shared/core/services/utils/utils";
import {RepairService} from "../../../../shared/core/services/repair/repair.service";

@Injectable({
    providedIn: 'root'
})
export class RepairsCarResolver implements Resolve<boolean> {

    constructor(
        private repairService: RepairService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable<boolean>(subscriber => {

            const carId: string = route.params['car_id'];

            if (isEmpty(carId)) {

                subscriber.next(false);
                subscriber.complete();

            } else {

                this.repairService
                    .getRepairs(
                        {
                            cars: carId,
                        },
                        {
                            page: 1,
                            limit: 10,
                            sort: 'updatedAt'
                        }
                    )
                    .subscribe((status) => {

                        subscriber.next(status);
                        subscriber.complete();

                    });

            }

        });

    }
}
