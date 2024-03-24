import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioriteDetailComponent } from './priorite-detail.component';

describe('PrioriteDetailComponent', () => {
  let component: PrioriteDetailComponent;
  let fixture: ComponentFixture<PrioriteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrioriteDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrioriteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
