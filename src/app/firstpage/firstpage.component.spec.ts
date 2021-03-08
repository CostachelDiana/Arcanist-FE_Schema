import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPage } from './firstpage.component';

describe('FirstPage', () => {
  let component: FirstPage;
  let fixture: ComponentFixture<FirstPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
