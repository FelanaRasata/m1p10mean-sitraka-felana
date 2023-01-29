import { Component } from '@angular/core'
import { LoaderService } from './modules/shared/core/services/loader/loader.service'
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router'


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'm1p10mean-sitraka-felana-front'


    constructor(
        public loaderService: LoaderService,
        private router: Router,
    ) {
    }


    ngOnInit() {

        this.router.events.subscribe(event => {

            if (event instanceof NavigationStart) {

                this.loaderService.hydrate(true)

            }

            if (event instanceof NavigationEnd || event instanceof NavigationCancel) {

                this.loaderService.hydrate(false)

            }

        })

    }

}
