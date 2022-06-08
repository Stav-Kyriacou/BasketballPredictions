import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeamPlayersComponent } from './view-team-players.component';

describe('ViewTeamPlayersComponent', () => {
  let component: ViewTeamPlayersComponent;
  let fixture: ComponentFixture<ViewTeamPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTeamPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeamPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
