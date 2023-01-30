import { Injectable } from '@angular/core'
import { IRepairType } from '../../models/schemas/repair_types.schema'
import { Observable } from 'rxjs'
import { baseUrl } from '../utils/utils'
import { API_ENDPOINTS } from '../../config/constants'
import { ICarDiagnosis } from '../../models/schemas/car-diagnosis.schema'
import { ApiService } from '../api/api.service'
import { NotificationService } from '../notification/notification.service'
import { ICarDiagnosisCreate } from '../../models/api/car_diagnosis.dto'


@Injectable({
    providedIn: 'root',
})
export class CarDiagnosisService {

    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService
    ) {
    }


    createCarDiagnosis(carDiagnosis: ICarDiagnosisCreate): Observable<boolean> {

        return new Observable<boolean>((subscriber) => {
            this.apiService
                .post<ICarDiagnosis>(
                    baseUrl(API_ENDPOINTS.car_diagnosis)
                    , {
                        ...carDiagnosis
                    }
                )
                .subscribe((result) => {

                    if (result.status != 200) {

                        this.notificationService.alert('Creation failed!', result.message, 'error')


                    }

                    subscriber.next(result.status == 200)
                    subscriber.complete()

                })

        })

    }
}
