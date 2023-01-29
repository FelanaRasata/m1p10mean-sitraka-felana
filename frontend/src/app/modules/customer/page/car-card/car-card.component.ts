import {Component} from '@angular/core'
import {CarService} from "../../../shared/core/services/car/car.service";
import {NotificationService} from "../../../shared/core/services/notification/notification.service";


@Component({
    selector: 'app-car-card',
    templateUrl: './car-card.component.html',
    styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent {

    title = "Car Card"

    constructor(
        public carService : CarService,
        private notificationService: NotificationService
    ) {
    }

    openDialog() {
       this.notificationService.confirmBox("test","test","test","test","test")
    }

}
