import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CarTakenBackComponent } from './car-taken-back.component'


describe('CarTakenBackComponent', () => {
    let component: CarTakenBackComponent
    let fixture: ComponentFixture<CarTakenBackComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CarTakenBackComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(CarTakenBackComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
