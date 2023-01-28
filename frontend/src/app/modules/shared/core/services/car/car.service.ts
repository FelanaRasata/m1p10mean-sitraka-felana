import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {baseUrl} from "../utils/utils";
import {PaginationService} from "../pagination/pagination.service";
import {NotificationService} from "../notification/notification.service";
import {ApiService} from "../api/api.service";
import {ICar} from "../../models/schemas/cars.schema";
import {API_ENDPOINTS} from "../../config/constants";


@Injectable({
    providedIn: 'root',
})
export class CarService {

    cars: BehaviorSubject<ICar[]> = new BehaviorSubject<ICar[]>([]);

    car: BehaviorSubject<ICar> = new BehaviorSubject<ICar>({} as ICar);

    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService,
        private paginationService: PaginationService
    ) {
    }

    getCars(options: any): Observable<boolean> {

        return new Observable<boolean>((subscriber) => {

            this.apiService
                .get<any>(
                    baseUrl(API_ENDPOINTS.car)
                    , {
                        params: {options: JSON.stringify(options)}
                    }
                )
                .subscribe((result) => {

                    if (result.status != 200) {

                        this.notificationService.alert('No data found', result.message, 'error');
                        subscriber.next(false);

                    } else {

                        this.cars.next(result.data.items);
                        this.paginationService.setPaginationData(result.data.paginator);
                        subscriber.next(true);

                    }

                    subscriber.complete()

                });

        });

    }


    getCar(carId: string): Observable<boolean> {

        return new Observable<boolean>((subscriber) => {

            const url = API_ENDPOINTS.car + "/" + carId

            this.apiService
                .get<any>(
                    baseUrl(url)
                )
                .subscribe((result) => {

                    if (result.status != 200) {

                        this.notificationService.alert('No data found', result.message, 'error');
                        subscriber.next(false);

                    } else {

                        this.car.next(result.data.items);
                        this.paginationService.setPaginationData(result.data.paginator);
                        subscriber.next(true);

                    }

                    subscriber.complete()

                });

        });

    }
}
