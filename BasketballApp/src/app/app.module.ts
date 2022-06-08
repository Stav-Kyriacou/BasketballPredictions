import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ViewTeam } from './components/compare-teams/compare-teams.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { LandingComponent } from './components/landing/landing.component';

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
    EditTeamName,
    ViewTeam,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularResizeEventModule,
    MaterialModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-0sne3sh6.us.auth0.com',
      clientId: 'D8GKUcGq1z2KPkbm9jSoen4WnmRjsqvE',

      // Request this audience at user authentication time
      audience: 'https://teameastbasketball.azurewebsites.net/',

      // Request this scope at user authentication time
      scope: 'read:current_user',

      // Specify configuration for the interceptor
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://dev-0sne3sh6.us.auth0.com/api/v2/' (note the asterisk)
            uri: 'https://teameastbasketball.azurewebsites.net/*',
            tokenOptions: {
              // The attached token should target this audience
              audience: 'https://teameastbasketball.azurewebsites.net/',

              // The attached token should have these scopes
              scope: 'read:current_user'
            }
          }
        ]
      }
    }),
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
