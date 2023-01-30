import { Component } from '@angular/core'
import { IRepairType } from '../../../shared/core/models/schemas/repair_types.schema'
import { NotificationService } from '../../../shared/core/services/notification/notification.service'
import { isEmpty } from '../../../shared/core/services/utils/utils'
import { CarDiagnosisService } from '../../../shared/core/services/car-diagnosis/car-diagnosis.service'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { ICarDiagnosisCreate, ICarDiagnosisCreateItem } from '../../../shared/core/models/api/car_diagnosis.dto'
import { Router } from '@angular/router'
import { LoaderService } from '../../../shared/core/services/loader/loader.service'


@Component({
    selector: 'app-car-diagnosis',
    templateUrl: './car-diagnosis.component.html',
    styleUrls: ['./car-diagnosis.component.scss'],
})
export class CarDiagnosisComponent {
    carDiagnosisCreate = {} as ICarDiagnosisCreate


    constructor(
        private notificationService: NotificationService,
        private carDiagnosisService: CarDiagnosisService,
        public repairService: RepairService,
        private router: Router,
        private loaderService: LoaderService,
    ) {
        this.carDiagnosisCreate.diagnosisRepairs = []
    }


    addRepairItem(repairType: IRepairType) {

        let repairTypeItem = {} as ICarDiagnosisCreateItem

        repairTypeItem.repairType = repairType
        repairTypeItem.quantity = 1

        let result = this.carDiagnosisCreate.diagnosisRepairs.find(element =>
            element.repairType._id === repairTypeItem.repairType._id)

        let message = ''

        if (!isEmpty(result) && !repairType.carPart) {
            message = repairType.name + ' is already added.'
            this.notificationService.alert(message)
        } else if (!isEmpty(result) && repairType.carPart) {
            message = repairType.name + ' quantity added.'
            result!.quantity++
            this.notificationService.alert(message)

        } else {
            this.carDiagnosisCreate.diagnosisRepairs.push(repairTypeItem)
        }

        console.log(this.carDiagnosisCreate.diagnosisRepairs)
    }


    removeRepairItem(repairTypeItem: any) {
        this.carDiagnosisCreate.diagnosisRepairs = this.carDiagnosisCreate.diagnosisRepairs
            .filter(element => element.repairType._id !== repairTypeItem.repairType._id)
    }


    sendCarDiagnosis() {
        this.loaderService.hydrate(true)
        this.carDiagnosisCreate.repair = this.repairService.repair.value._id

        this.carDiagnosisService.createCarDiagnosis(this.carDiagnosisCreate).subscribe((status) => {

            if (status) {
                
                this.router.navigate(['/workshop/repairs']).then(() => {

                    this.loaderService.hydrate(false)
                    this.notificationService.alert('Diagnostic', 'Car Diagnosis', 'success')

                })

            }

        })
    }
}
