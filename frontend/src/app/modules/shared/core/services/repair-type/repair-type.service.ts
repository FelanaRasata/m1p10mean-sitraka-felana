import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { IRepairType } from '../../models/schemas/repair_types.schema'
import { ApiService } from '../api/api.service'
import { NotificationService } from '../notification/notification.service'
import { PaginationService } from '../pagination/pagination.service'
import { baseUrl } from '../utils/utils'
import { API_ENDPOINTS } from '../../config/constants'


@Injectable({
  providedIn: 'root'
})
export class RepairTypeService {

    repairTypes: BehaviorSubject<IRepairType[]> = new BehaviorSubject<IRepairType[]>([]);

  constructor(
      private apiService: ApiService,
      private notificationService: NotificationService,
      private paginationService: PaginationService
  ) { }

    getRepairTypes(options: any): Observable<boolean> {

        return new Observable<boolean>((subscriber) => {

            this.apiService
                .get<any>(
                    baseUrl(API_ENDPOINTS.repair_types)
                    , {
                        params: {options: JSON.stringify(options)}
                    }
                )
                .subscribe((result) => {

                    if (result.status != 200) {

                        this.notificationService.alert('No data found', result.message, 'error');
                        subscriber.next(false);

                    } else {

                        this.repairTypes.next(result.data.items);
                        this.paginationService.setPaginationData(result.data.paginator);
                        subscriber.next(true);

                    }

                    subscriber.complete()

                });

        });

    }

}
