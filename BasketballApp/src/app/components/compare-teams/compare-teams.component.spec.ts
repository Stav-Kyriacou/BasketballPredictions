import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareTeamsComponent } from './compare-teams.component';

describe('CompareTeamsComponent', () => {
  let component: CompareTeamsComponent;
  let fixture: ComponentFixture<CompareTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
