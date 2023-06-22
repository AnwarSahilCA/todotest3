import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedeventComponent } from './completedevent.component';

describe('CompletedeventComponent', () => {
  let component: CompletedeventComponent;
  let fixture: ComponentFixture<CompletedeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedeventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
