import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RepairPaymentComponent } from './repair-payment.component'


describe('RepairPaymentComponent', () => {
    let component: RepairPaymentComponent
    let fixture: ComponentFixture<RepairPaymentComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RepairPaymentComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(RepairPaymentComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
