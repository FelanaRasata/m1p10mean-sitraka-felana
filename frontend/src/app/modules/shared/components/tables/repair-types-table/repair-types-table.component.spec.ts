import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairTypesTableComponent } from './repair-types-table.component';

describe('RepairTypesTableComponent', () => {
  let component: RepairTypesTableComponent;
  let fixture: ComponentFixture<RepairTypesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairTypesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairTypesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
