import { Component } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { BehaviorSubject } from 'rxjs'
import { NotificationService } from '../../../shared/core/services/notification/notification.service'
import { Router } from '@angular/router'


@Component({
    selector: 'app-repair-choice',
    templateUrl: './repair-choice.component.html',
    styleUrls: ['./repair-choice.component.scss'],
})
export class RepairChoiceComponent {

    selectedList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])


    constructor(
        public repairService: RepairService,
        public notificationService: NotificationService,
        private router: Router,
    ) {
    }


    initiateRepair(): void {

        if (this.selectedList.value.length > 0) {

            const repairDto: any = {...this.repairService.repair.value}

            repairDto.selectedRepairs = []
            repairDto.initiatedAt = new Date().getTime()

            for (const selectedRepair of this.selectedList.value) {

                repairDto.selectedRepairs.push({
                    repairType: selectedRepair,
                    checked: false,
                })

            }

            this.repairService.initRepair(repairDto._id, repairDto).subscribe((status) => {

                this.router.navigate([`/customer/cars/${repairDto.car._id}`]).then(() => {

                    this.notificationService.alert('Repair', 'Repair initiated', 'success')

                })

            })

        } else {

            this.notificationService.alert('Missing data', 'Please choose at least one before initiating the repair', 'warning')

        }

    }


    payDiagnosis(): void {

        this.notificationService.alert('Canceled', 'OK', 'success')

    }

}
