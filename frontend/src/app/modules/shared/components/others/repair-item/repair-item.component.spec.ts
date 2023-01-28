import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairItemComponent } from './repair-item.component';

describe('RepairItemComponent', () => {
  let component: RepairItemComponent;
  let fixture: ComponentFixture<RepairItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
