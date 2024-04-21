import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardssComponent } from './boardss.component';

describe('BoardssComponent', () => {
  let component: BoardssComponent;
  let fixture: ComponentFixture<BoardssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
