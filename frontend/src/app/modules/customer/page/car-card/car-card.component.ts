import { Component } from '@angular/core'
import { CarService } from '../../../shared/core/services/car/car.service'
import { NotificationService } from '../../../shared/core/services/notification/notification.service'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { LoaderService } from '../../../shared/core/services/loader/loader.service'


@Component({
    selector: 'app-car-card',
    templateUrl: './car-card.component.html',
    styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent {

    title = 'Car Card'

    repairUrlPath = '/customer/repairs/:id'


    constructor(
        public carService: CarService,
        public repairService: RepairService,
        private notificationService: NotificationService,
        private loaderService: LoaderService,
    ) {
    }


    async confirmRepair(carId: string): Promise<void> {

        const initRepair: boolean = await this.notificationService.confirmBox(
            `Drop off ${this.carService.car.value.carNumber}`,
            'Drop off my car',
            'Cancel',
            'Sure',
            'Cancel',
        )

        if (initRepair) {

            this.loaderService.hydrate(true)

            this.repairService.dropOffCar(carId).subscribe((status) => {

                if (status) {

                    this.repairService.getRepairs(
                        {
                            car: carId
                        },
                        {
                            page: 1,
                            limit: 10,
                            sort: '-createdAt',
                        }
                        ).subscribe(() => {

                        this.notificationService.alert('Init success', `Car ${this.repairService.repair.value.car.carNumber}`, 'success')
                        this.loaderService.hydrate(false)

                    })

                }

            })

        }

    }

}
