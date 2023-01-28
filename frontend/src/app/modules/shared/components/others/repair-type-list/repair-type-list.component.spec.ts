import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairTypeListComponent } from './repair-type-list.component';

describe('RepairTypeListComponent', () => {
  let component: RepairTypeListComponent;
  let fixture: ComponentFixture<RepairTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
