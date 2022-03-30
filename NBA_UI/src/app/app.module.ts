import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { PlayerComponent } from '../components/player/player.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ 
                  AppComponent, 
                  HeaderComponent,
                  PlayerComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
