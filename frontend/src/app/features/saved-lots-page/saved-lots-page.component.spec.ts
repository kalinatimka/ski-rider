import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedLotsPageComponent } from './saved-lots-page.component';

describe('SavedLotsPageComponent', () => {
  let component: SavedLotsPageComponent;
  let fixture: ComponentFixture<SavedLotsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedLotsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedLotsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
