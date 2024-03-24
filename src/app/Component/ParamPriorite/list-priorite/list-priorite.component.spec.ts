import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrioriteComponent } from './list-priorite.component';

describe('ListPrioriteComponent', () => {
  let component: ListPrioriteComponent;
  let fixture: ComponentFixture<ListPrioriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPrioriteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPrioriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
