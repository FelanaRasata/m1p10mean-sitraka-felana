import { Component } from '@angular/core';
import { SessionService } from '../../../core/services/session/session.service'

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
    constructor(
        public sessionService : SessionService
    ) {
    }
}
