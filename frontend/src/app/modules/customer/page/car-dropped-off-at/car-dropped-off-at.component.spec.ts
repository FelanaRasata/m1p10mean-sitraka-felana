import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDroppedOffAtComponent } from './car-dropped-off-at.component';

describe('CarDroppedOffAtComponent', () => {
  let component: CarDroppedOffAtComponent;
  let fixture: ComponentFixture<CarDroppedOffAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDroppedOffAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDroppedOffAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
