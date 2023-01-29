import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedItemsTableComponent } from './selected-items-table.component';

describe('SelectedItemsTableComponent', () => {
  let component: SelectedItemsTableComponent;
  let fixture: ComponentFixture<SelectedItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedItemsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
