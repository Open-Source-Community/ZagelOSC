import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule  } from '@angular/common/http';
import { HttpModule } from '@angular/http';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestfulProvider } from '../providers/restful/restful';
import { InputmodelPage } from '../pages/inputmodel/inputmodel';

import { IonicImageViewerModule } from 'ionic-img-viewer';
import { EmoteProvider } from '../providers/emote/emote';

import {LocalNotifications} from '@ionic-native/local-notifications'
import { LoginPage } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
    InputmodelPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    IonicImageViewerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InputmodelPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestfulProvider,
    EmoteProvider,
    LocalNotifications
  ]
})
export class AppModule {}
