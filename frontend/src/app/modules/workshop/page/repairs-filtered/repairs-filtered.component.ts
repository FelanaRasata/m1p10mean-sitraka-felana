import { Component } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { LoaderService } from '../../../shared/core/services/loader/loader.service'


@Component({
    selector: 'app-repairs-filtered',
    templateUrl: './repairs-filtered.component.html',
    styleUrls: ['./repairs-filtered.component.scss'],
})
export class RepairsFilteredComponent {
    title = 'List of repair'

    repairUrlPath = '/workshop/repairs/:id'

    request = '0'


    constructor(private repairService: RepairService,
                private loaderService: LoaderService
    ) {
    }


    options = [
        {name: 'State', value: '0', query: {}},
        {
            name: 'Dropped Off', value: '1',
            query: {
                carDroppedOffAt: {$ne: null},
                diagnosedAt: {$eq: null},
            }
        },
        {
            name: 'Diagnosis', value: '2',
            query: {
                diagnosedAt: {$ne: null},
                initiatedAt: {$eq: null},
            }
        },
        {
            name: 'Validate By Client', value: '3',
            query: {
                initiatedAt: {$ne: null},
                inProgressAt: {$eq: null},
            }
        },
        {
            name: 'In Progress', value: '4',
            query: {
                inProgressAt: {$ne: null},
                carRepairedAt: {$eq: null},
            }
        },
        {
            name: 'Repaired', value: '5',
            query: {
                carRepairedAt: {$ne: null},
                paidAt: {$eq: null},
            }
        },
        {
            name: 'Paid', value: '6',
            query: {
                paidAt: {$ne: null},
                carTakenBackAt: {$eq: null},
            }
        },
        {
            name: 'Taken Back', value: '7',
            query: {
                carTakenBackAt: {$ne: null},
            }
        }
    ]


    search() {
        this.loaderService.hydrate(true)

        let query;

        for (let option of this.options){
            if (this.request==option.value)
                query = option.query
        }

        this.repairService.getRepairs(query, {
            page: 1,
            limit: 10,
            sort: '-updatedAt'
        }).subscribe((status) => {
            if (status)
                this.loaderService.hydrate(false)
        })

    }

}
