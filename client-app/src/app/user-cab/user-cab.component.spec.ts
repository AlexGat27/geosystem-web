import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCabComponent } from './user-cab.component';

describe('UserCabComponent', () => {
  let component: UserCabComponent;
  let fixture: ComponentFixture<UserCabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCabComponent]
    });
    fixture = TestBed.createComponent(UserCabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
