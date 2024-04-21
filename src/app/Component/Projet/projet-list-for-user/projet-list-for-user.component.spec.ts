import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetListForUserComponent } from './projet-list-for-user.component';

describe('ProjetListForUserComponent', () => {
  let component: ProjetListForUserComponent;
  let fixture: ComponentFixture<ProjetListForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjetListForUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjetListForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
