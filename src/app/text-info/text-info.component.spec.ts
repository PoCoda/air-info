import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInfosComponent as TextInfosComponent } from './text-info.component';

describe('TextInfo Component', () => {
  let component: TextInfosComponent;
  let fixture: ComponentFixture<TextInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
