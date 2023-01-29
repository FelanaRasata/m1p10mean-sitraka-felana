import { Component } from '@angular/core'
import { SessionService } from '../../modules/shared/core/services/session/session.service'
import { EUrlPart, EUserType } from '../../modules/shared/core/models/global/static_enums'
import { baseUrl } from '../../modules/shared/core/services/utils/utils'


@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {

    baseUrl = "/";

    constructor(
        public sessionService: SessionService
    ) {
        if (this.sessionService.onlineUser.value?.type==EUserType.CUS)
            this.baseUrl += EUrlPart.CUS

        if (this.sessionService.onlineUser.value?.type==EUserType.FIM)
            this.baseUrl += EUrlPart.FIM

        if (this.sessionService.onlineUser.value?.type==EUserType.WOM)
            this.baseUrl += EUrlPart.WOM

        this.baseUrl += "/profile"

    }
}
