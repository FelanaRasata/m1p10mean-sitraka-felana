import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CarDroppedOffComponent } from './car-dropped-off.component'


describe('CarDroppedOffComponent', () => {
    let component: CarDroppedOffComponent
    let fixture: ComponentFixture<CarDroppedOffComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CarDroppedOffComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(CarDroppedOffComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
