import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLotComponent } from './save-lot.component';

describe('SaveLotComponent', () => {
  let component: SaveLotComponent;
  let fixture: ComponentFixture<SaveLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
