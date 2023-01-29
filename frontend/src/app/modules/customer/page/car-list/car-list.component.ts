import { Component } from '@angular/core'
import { CarCreationComponent } from '../../components/modals/car-creation/car-creation.component'
import { MatDialog } from '@angular/material/dialog'
import { SessionService } from '../../../shared/core/services/session/session.service'
import { LoaderService } from '../../../shared/core/services/loader/loader.service'
import { isEmpty } from '../../../shared/core/services/utils/utils'
import { CarService } from '../../../shared/core/services/car/car.service'


@Component({
    selector: 'app-car-list',
    templateUrl: './car-list.component.html',
    styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent {

    constructor(
        public sessionService: SessionService,
        public carService: CarService,
        public dialog: MatDialog,
        public loaderService: LoaderService,
    ) {
    }


    get title(): any {

        return 'My Cars'

    }


    createNewCar(): void {

        const dialogRef = this.dialog.open(CarCreationComponent, {
            minWidth: '40%',
            data: {title: `Create new car`, userId: this.sessionService.onlineUser.value?._id},
        })

        dialogRef.beforeClosed().subscribe((result) => {

            this.loaderService.hydrate(true)

            if (!isEmpty(result)) {

                // this.carService.createUser(result.data).subscribe(() => {
                //
                //     this.loaderService.hydrate(false)
                //
                // })
                console.log('>>>>>>>>>>>', result)
                this.loaderService.hydrate(false)

            } else {

                this.loaderService.hydrate(false)

            }

        })

    }

}
