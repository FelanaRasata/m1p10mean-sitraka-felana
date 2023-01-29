import { Component } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { logMessages } from '@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild'
import { Router } from '@angular/router'


@Component({
    selector: 'app-repair-initiated',
    templateUrl: './repair-initiated.component.html',
    styleUrls: ['./repair-initiated.component.scss'],
})
export class RepairInitiatedComponent {
    constructor(
        public repairService: RepairService,
        public router: Router
    ) {
    }

    validateFinance(){
        this.repairService.financeValidate(this.repairService.repair.value._id).subscribe({
            next:() => this.router.navigate(['/financial'])
        })
    }
}
