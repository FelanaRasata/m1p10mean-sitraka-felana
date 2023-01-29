import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCreationComponent } from './car-creation.component';

describe('CarCreationComponent', () => {
  let component: CarCreationComponent;
  let fixture: ComponentFixture<CarCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
