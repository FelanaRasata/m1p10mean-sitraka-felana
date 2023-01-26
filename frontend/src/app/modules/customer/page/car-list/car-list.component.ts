import { Component } from '@angular/core'
import {CarService} from "../../../shared/core/services/car/car.service";
import {SessionService} from "../../../shared/core/services/session/session.service";
import {isEmpty} from "../../../shared/core/services/utils/utils";


@Component({
    selector: 'app-car-list',
    templateUrl: './car-list.component.html',
    styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent {

    constructor(
        private sessionService: SessionService
    ) {
    }

    get title(): any {

        if (isEmpty(this.sessionService.onlineUser.value)) {

            return 'Your Cars';

        } else {

            return `${ this.sessionService.onlineUser.value?.lastName } your cars`

        }

    }

}
