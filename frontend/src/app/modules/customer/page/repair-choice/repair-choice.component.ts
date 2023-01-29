import { Component } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { BehaviorSubject } from 'rxjs'
import { NotificationService } from '../../../shared/core/services/notification/notification.service'


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
    ) {
    }


    initiateRepair(): void {

        if (this.selectedList.value.length > 0) {

            const repairDto: any = { ...this.repairService.repair.value }

            console.log('>>>>>>>>>>', repairDto)

            repairDto.selectedRepairs = []
            repairDto.initiatedAt = new Date()

            for (const selectedRepair of this.selectedList.value) {

                repairDto.selectedRepairs.push({
                    repairType: selectedRepair,
                    checked: false
                })

            }

            // this.repairService.initRepair(repairDto._id, repairDto).subscribe((status) => {
            //
            //     this.notificationService.alert('Repair', 'Repair initiated', 'success')
            //
            // })

        } else {

            this.notificationService.alert('Missing data', 'Please choose at least one before initiating the repair', 'warning')

        }

    }


    payDiagnosis(): void {

        this.notificationService.alert('Canceled', 'OK', 'success')

    }

}
