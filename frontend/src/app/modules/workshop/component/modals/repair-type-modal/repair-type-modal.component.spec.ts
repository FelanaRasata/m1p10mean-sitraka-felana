import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairTypeModalComponent } from './repair-type-modal.component';

describe('RepairTypeModalComponent', () => {
  let component: RepairTypeModalComponent;
  let fixture: ComponentFixture<RepairTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairTypeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
