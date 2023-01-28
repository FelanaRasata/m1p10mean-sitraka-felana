import { Component } from '@angular/core'
import { NotificationService } from '../../../shared/core/services/notification/notification.service'


@Component({
    selector: 'app-repair-card',
    templateUrl: './repair-card.component.html',
    styleUrls: ['./repair-card.component.scss'],
})
export class RepairCardComponent {
    title = 'Repair Card'


    constructor(private notificationService: NotificationService) {

    }

    confirm(){
        // this.notificationService.confirmBox("test","test","test","test","test");
        this.notificationService.alert("test","test","test");
    }
}
