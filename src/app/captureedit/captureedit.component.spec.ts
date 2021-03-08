import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureEditPage } from './captureedit.component';

describe('CaptureEditPage', () => {
  let component: CaptureEditPage;
  let fixture: ComponentFixture<CaptureEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptureEditPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
