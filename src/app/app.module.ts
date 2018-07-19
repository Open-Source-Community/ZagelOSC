import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule  } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { Pro } from '@ionic/pro';
import { Injectable, Injector } from '@angular/core';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestfulProvider } from '../providers/restful/restful';
import { InputmodelPage } from '../pages/inputmodel/inputmodel';

import { IonicImageViewerModule } from 'ionic-img-viewer';
import { EmoteProvider } from '../providers/emote/emote';

import {LocalNotifications} from '@ionic-native/local-notifications'
import { LoginPage } from '../pages/login/login';

import { HeaderColor  } from '@ionic-native/header-color';


Pro.init('6C12FFFB', {
  appVersion: '0.0.1'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

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
    IonicErrorHandler,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }],
    RestfulProvider,
    EmoteProvider,
    LocalNotifications,
    HeaderColor,
  ]
})
export class AppModule {}
