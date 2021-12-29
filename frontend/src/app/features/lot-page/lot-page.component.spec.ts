import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotPageComponent } from './lot-page.component';

describe('LotPageComponent', () => {
  let component: LotPageComponent;
  let fixture: ComponentFixture<LotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
