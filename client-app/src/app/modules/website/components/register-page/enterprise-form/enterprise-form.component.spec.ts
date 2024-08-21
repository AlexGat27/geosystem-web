import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseFormComponent } from './enterprise-form.component';

describe('EnterpriseFormComponent', () => {
  let component: EnterpriseFormComponent;
  let fixture: ComponentFixture<EnterpriseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterpriseFormComponent]
    });
    fixture = TestBed.createComponent(EnterpriseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
