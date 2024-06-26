import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheDetailComponent } from './tache-detail.component';

describe('TacheDetailComponent', () => {
  let component: TacheDetailComponent;
  let fixture: ComponentFixture<TacheDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TacheDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TacheDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
