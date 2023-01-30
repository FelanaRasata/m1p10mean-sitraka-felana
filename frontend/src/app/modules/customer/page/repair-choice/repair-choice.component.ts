import { Component } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { BehaviorSubject } from 'rxjs'
import { NotificationService } from '../../../shared/core/services/notification/notification.service'
import { Router } from '@angular/router'
import { LoaderService } from '../../../shared/core/services/loader/loader.service'
import { IRepairTypeTemp } from '../../../shared/core/models/schemas/repairs.schema'


@Component({
    selector: 'app-repair-choice',
    templateUrl: './repair-choice.component.html',
    styleUrls: ['./repair-choice.component.scss'],
})
export class RepairChoiceComponent {

    selectedList: BehaviorSubject<IRepairTypeTemp[]> = new BehaviorSubject<IRepairTypeTemp[]>([])


    constructor(
        public repairService: RepairService,
        public notificationService: NotificationService,
        public loaderService: LoaderService,
        private router: Router,
    ) {
    }


    initiateRepair(): void {

        this.loaderService.hydrate(true)

        if (this.selectedList.value.length > 0) {

            const repairDto: any = {...this.repairService.repair.value}

            repairDto.selectedRepairs = []
            repairDto.initiatedAt = new Date().getTime()

            for (const selectedRepair of this.selectedList.value) {

                repairDto.selectedRepairs.push({
                    repairType: selectedRepair.repairType,
                    quantity: selectedRepair.quantity,
                    checked: false,
                })

            }

            this.repairService.initRepair(repairDto._id, repairDto).subscribe((status) => {

                if (status) {

                    this.router.navigate([`/customer/cars/${repairDto.car._id}`]).then(() => {

                        this.notificationService.alert('Repair', 'Repair initiated', 'success')

                    })

                }

                this.loaderService.hydrate(false)

            })

        } else {

            this.notificationService.alert('Missing data', 'Please choose at least one before initiating the repair', 'warning')

        }

    }


    payDiagnosis(): void {

        this.notificationService.alert('Canceled', 'OK', 'success')

    }

}
