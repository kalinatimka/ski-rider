import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotCardComponent } from './lot-card.component';

describe('LotCardComponent', () => {
  let component: LotCardComponent;
  let fixture: ComponentFixture<LotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
