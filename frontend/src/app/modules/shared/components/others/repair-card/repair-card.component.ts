import { Component } from '@angular/core'
import { NotificationService } from '../../../core/services/notification/notification.service'
import { RepairService } from '../../../core/services/repair/repair.service'
import { SessionService } from '../../../core/services/session/session.service'
import { EUserType } from '../../../core/models/global/static_enums'


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


    constructor(
        private notificationService: NotificationService,
        public repairService: RepairService,
        public sessionService: SessionService,
    ) {

        const repair = this.repairService.repair.value

        this.workshopProgressButtonActive = repair.inProgressAt && !repair.carRepairedAt && this.sessionService.onlineUser.value?.type === EUserType.WOM

        this.workshopStartDiagnosis = !repair.car_diagnosis && repair.carDroppedOffAt && this.sessionService.onlineUser.value?.type === EUserType.WOM

        this.customerRepairSelect = repair.diagnosedAt && !repair.initiatedAt && this.sessionService.onlineUser.value?.type === EUserType.CUS

        this.customerExitCar = repair.carRepairedAt && !repair.paidAt && this.sessionService.onlineUser.value?.type === EUserType.CUS

        this.financialValidatePurchase = repair.initiatedAt && !repair.inProgressAt && this.sessionService.onlineUser.value?.type === EUserType.FIM

    }


    confirm() {
        this.notificationService.confirmBox('test', 'test', 'test', 'test', 'test')
    }

}
