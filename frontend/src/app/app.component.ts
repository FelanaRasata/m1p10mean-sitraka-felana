import { Component } from '@angular/core'
import { LoaderService } from './modules/shared/core/services/loader/loader.service'


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'm1p10mean-sitraka-felana-front'


    constructor(
        public loaderService: LoaderService
    ) {
    }
}
