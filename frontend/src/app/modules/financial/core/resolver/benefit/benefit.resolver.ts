import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RepairService } from '../../../../shared/core/services/repair/repair.service'

@Injectable({
  providedIn: 'root'
})
export class BenefitResolver implements Resolve<boolean> {
    constructor(
        private repairService: RepairService
    ) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable<boolean>(subscriber => {

            this.repairService
                .getBenefit()
                .subscribe((status) => {

                    subscriber.next(status)
                    subscriber.complete()

                })


        })
    }
}
