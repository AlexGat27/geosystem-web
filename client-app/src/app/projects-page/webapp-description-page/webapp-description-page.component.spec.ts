import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebappDescriptionPageComponent } from './webapp-description-page.component';

describe('WebappDescriptionPageComponent', () => {
  let component: WebappDescriptionPageComponent;
  let fixture: ComponentFixture<WebappDescriptionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebappDescriptionPageComponent]
    });
    fixture = TestBed.createComponent(WebappDescriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
