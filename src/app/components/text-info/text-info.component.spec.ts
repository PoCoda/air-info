import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInfoComponent as TextInfoComponent } from './text-info.component';

describe('TextInfo Component', () => {
  let component: TextInfoComponent;
  let fixture: ComponentFixture<TextInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
