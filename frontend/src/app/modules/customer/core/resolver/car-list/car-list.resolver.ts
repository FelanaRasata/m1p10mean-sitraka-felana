import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router'
import {EMPTY, Observable} from 'rxjs'
import {ICar} from '../../../../shared/core/models/schemas/cars.schema'
import {CarService} from "../../../../shared/core/services/car/car.service";


@Injectable({
    providedIn: 'root',
})
export class CarListResolver implements Resolve<boolean> {

    constructor(
        private carService: CarService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return new Observable<boolean>(subscriber => {

            this.carService
                .getCars(
                    {
                        page: 1,
                        limit: 10,
                        sort: 'carNumber'
                    }
                )
                .subscribe((status) => {

                    subscriber.next(status);
                    subscriber.complete();

                });


        });
    }

}
