import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordScreenComponent } from './change-password-screen.component';

describe('ChangePasswordScreenComponent', () => {
  let component: ChangePasswordScreenComponent;
  let fixture: ComponentFixture<ChangePasswordScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
