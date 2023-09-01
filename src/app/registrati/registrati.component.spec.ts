import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistratiComponent } from './registrati.component';

describe('RegistratiComponent', () => {
  let component: RegistratiComponent;
  let fixture: ComponentFixture<RegistratiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistratiComponent]
    });
    fixture = TestBed.createComponent(RegistratiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
