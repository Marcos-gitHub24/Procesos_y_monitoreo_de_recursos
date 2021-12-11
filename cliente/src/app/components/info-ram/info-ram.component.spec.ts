import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRamComponent } from './info-ram.component';

describe('InfoRamComponent', () => {
  let component: InfoRamComponent;
  let fixture: ComponentFixture<InfoRamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
