import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FizikFormComponent } from './fizik-form.component';

describe('FizikFormComponent', () => {
  let component: FizikFormComponent;
  let fixture: ComponentFixture<FizikFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FizikFormComponent]
    });
    fixture = TestBed.createComponent(FizikFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
