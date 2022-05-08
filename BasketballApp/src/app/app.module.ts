import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from './components/banner/banner.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component'
import { SelectPlayer } from './components/edit-team/edit-team.component';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { AngularResizeEventModule } from 'angular-resize-event';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    HeaderComponent,
    CreateTeamComponent,
    BannerComponent,
    EditTeamComponent,
    SelectPlayer,
    PlayerTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularResizeEventModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
