import { Component } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { logMessages } from '@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild'


@Component({
    selector: 'app-repair-initiated',
    templateUrl: './repair-initiated.component.html',
    styleUrls: ['./repair-initiated.component.scss'],
})
export class RepairInitiatedComponent {
    constructor(
        public repairService: RepairService
    ) {
    }

    validateFinance(){
        this.repairService.financeValidate(this.repairService.repair.value._id).subscribe({
            next:() => console.log("SUCCESS")
        })
    }
}
