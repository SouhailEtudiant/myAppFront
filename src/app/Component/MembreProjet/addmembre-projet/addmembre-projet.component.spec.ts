import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmembreProjetComponent } from './addmembre-projet.component';

describe('AddmembreProjetComponent', () => {
  let component: AddmembreProjetComponent;
  let fixture: ComponentFixture<AddmembreProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddmembreProjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddmembreProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
