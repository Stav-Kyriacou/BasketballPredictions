import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewAllTeamsComponent } from './components/view-all-teams/view-all-teams.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './components/banner/banner.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component'
import { SelectPlayer } from './components/edit-team/edit-team.component';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { AngularResizeEventModule } from 'angular-resize-event';
import { MaterialModule } from './material.module';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CreateNewTeamComponent } from './components/create-new-team/create-new-team.component';
import { CompareTeamsComponent } from './components/compare-teams/compare-teams.component';
import { EditTeamName } from './components/edit-team/edit-team.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    HeaderComponent,
    ViewAllTeamsComponent,
    BannerComponent,
    EditTeamComponent,
    SelectPlayer,
    PlayerTableComponent,
    ConfirmComponent,
    CreateNewTeamComponent,
    CompareTeamsComponent,
    EditTeamName
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularResizeEventModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
