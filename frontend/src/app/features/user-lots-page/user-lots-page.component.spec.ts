import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLotsPageComponent } from './user-lots-page.component';

describe('UserLotsPageComponent', () => {
  let component: UserLotsPageComponent;
  let fixture: ComponentFixture<UserLotsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLotsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLotsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
