import { Component } from '@angular/core'
import { NotificationService } from '../../../shared/core/services/notification/notification.service'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { SessionService } from '../../../shared/core/services/session/session.service'
import { EUserType } from '../../../shared/core/models/global/static_enums'


@Component({
    selector: 'app-repair-card',
    templateUrl: './repair-card.component.html',
    styleUrls: ['./repair-card.component.scss'],
})
export class RepairCardComponent {
    title = 'Repair Card'


    workshopProgressButtonActive = false

    constructor(
        private notificationService: NotificationService,
        public repairService: RepairService,
        public sessionService: SessionService,
    ) {

        const repair = this.repairService.repair.value
        this.workshopProgressButtonActive = repair.inProgressAt && !repair.carRepairedAt && this.sessionService.onlineUser.value?.type === EUserType.WOM

    }


    confirm() {
        this.notificationService.confirmBox('test', 'test', 'test', 'test', 'test')
    }

}
