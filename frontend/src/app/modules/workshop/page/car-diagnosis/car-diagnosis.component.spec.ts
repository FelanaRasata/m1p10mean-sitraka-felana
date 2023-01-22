import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDiagnosisComponent } from './car-diagnosis.component';

describe('CarDiagnosisComponent', () => {
  let component: CarDiagnosisComponent;
  let fixture: ComponentFixture<CarDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDiagnosisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
