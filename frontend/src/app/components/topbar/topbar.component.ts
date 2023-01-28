import { Component } from '@angular/core'
import { SessionService } from '../../modules/shared/core/services/session/session.service'


@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
    constructor(
        public sessionService: SessionService
    ) {
    }
}
