import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../../../core/services/notification/notification.service'
import { RepairService } from '../../../core/services/repair/repair.service'
import { SessionService } from '../../../core/services/session/session.service'
import { EUserType } from '../../../core/models/global/static_enums'
import { IRepairTypeItem } from '../../../core/models/schemas/repairs.schema'
import { LoaderService } from '../../../core/services/loader/loader.service'
import { Router } from '@angular/router'


@Component({
    selector: 'app-repair-card',
    templateUrl: './repair-card.component.html',
    styleUrls: ['./repair-card.component.scss'],
})
export class RepairCardComponent {
    title = 'Repair Card'


    workshopProgressButtonActive = false

    workshopStartDiagnosis = false

    customerRepairSelect = false

    customerExitCar = false

    financialValidatePurchase = false

    showProgressBar = false

    workshopConfirmTakeCar = false


    constructor(
        private notificationService: NotificationService,
        public repairService: RepairService,
        public sessionService: SessionService,
        private loaderService: LoaderService,
        private router: Router
    ) {

        const repair = this.repairService.repair.value

        this.workshopProgressButtonActive = repair.inProgressAt && !repair.carRepairedAt && this.sessionService.onlineUser.value?.type === EUserType.WOM

        this.workshopStartDiagnosis = !repair.car_diagnosis && repair.carDroppedOffAt && this.sessionService.onlineUser.value?.type === EUserType.WOM

        this.customerRepairSelect = repair.diagnosedAt && !repair.initiatedAt && this.sessionService.onlineUser.value?.type === EUserType.CUS

        this.customerExitCar = repair.carRepairedAt && !repair.paidAt && this.sessionService.onlineUser.value?.type === EUserType.CUS

        this.financialValidatePurchase = repair.initiatedAt && !repair.inProgressAt && this.sessionService.onlineUser.value?.type === EUserType.FIM

        this.workshopConfirmTakeCar = repair.paidAt && !repair.carTakenBackAt && this.sessionService.onlineUser.value?.type === EUserType.WOM

        this.showProgressBar = !!repair.inProgressAt

        this.calculateProgress()
    }


    confirm() {
        this.notificationService.confirmBox('test', 'test', 'test', 'test', 'test')
    }


    percentageNow = 0

    progressWidth = ''


    calculateProgress() {
        const max = this.repairService.repair.value.selectedRepairs.length
        const now = this.repairService.repair.value.selectedRepairs.filter(element => element.checked).length

        this.percentageNow = (now * 100) / max

        this.progressWidth = this.percentageNow + '%'

    }


    async exitVoucher() {

        this.loaderService.hydrate(true)

        const validate: boolean = await this.notificationService.confirmBox(
            `Take Back Car?`,
            'Exit voucher',
            'Cancel',
            'Sure',
            'Cancel',
        )

        if (validate) {
            this.repairService.paidRepair(this.repairService.repair.value._id).subscribe({
                next: () => this.router.navigate(['/customer/repairs'])
            })
        }

    }

    async takeBackCar() {

        this.loaderService.hydrate(true)

        const validate: boolean = await this.notificationService.confirmBox(
            `Confirm the car's exit?`,
            'Exit voucher',
            'Cancel',
            'Sure',
            'Cancel',
        )

        if (validate) {
            this.repairService.takenCarBack(this.repairService.repair.value._id).subscribe({
                next: () => this.router.navigate(['/workshop/repairs'])
            })
        }

    }

}
