import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from "rxjs";
import {baseUrl} from "../utils/utils";
import {API_ENDPOINTS} from "../../config/constants";
import {ApiService} from "../api/api.service";
import {NotificationService} from "../notification/notification.service";
import {PaginationService} from "../pagination/pagination.service";
import {IRepair} from "../../models/schemas/repairs.schema";


@Injectable({
    providedIn: 'root',
})
export class RepairService {

    repairs: BehaviorSubject<IRepair[]> = new BehaviorSubject<IRepair[]>([]);

    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService,
        private paginationService: PaginationService
    ) {
    }

    getRepairOfCar(query: any, options: any): Observable<boolean> {

        return new Observable<boolean>((subscriber) => {

            this.apiService
                .get<any>(
                    baseUrl(API_ENDPOINTS.repairs_car)
                    , {
                        params: {query: JSON.stringify(query), options: JSON.stringify(options)}
                    }
                )
                .subscribe((result) => {

                    if (result.status != 200) {

                        this.notificationService.alert('No data found', result.message, 'error');
                        subscriber.next(false);

                    } else {

                        this.repairs.next(result.data.items);
                        this.paginationService.setPaginationData(result.data.paginator);
                        subscriber.next(true);

                    }

                    subscriber.complete()

                });

        });

    }

}
