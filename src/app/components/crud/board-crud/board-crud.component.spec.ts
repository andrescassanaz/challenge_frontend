import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCrudComponent } from './board-crud.component';

describe('BoardCrudComponent', () => {
  let component: BoardCrudComponent;
  let fixture: ComponentFixture<BoardCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
