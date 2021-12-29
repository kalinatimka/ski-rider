import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBidsPageComponent } from './user-bids-page.component';

describe('UserBidsPageComponent', () => {
  let component: UserBidsPageComponent;
  let fixture: ComponentFixture<UserBidsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBidsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBidsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
