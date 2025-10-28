import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackShadow } from './back-shadow';

describe('BackShadow', () => {
  let component: BackShadow;
  let fixture: ComponentFixture<BackShadow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackShadow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackShadow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
