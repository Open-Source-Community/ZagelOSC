import { Component } from '@angular/core';
import { Platform, Tabs } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HeaderColor } from '@ionic-native/header-color';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "SplashPage";

  constructor(
    headerCol : HeaderColor,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      headerCol.tint("#becb29"); 
      //
      //
    });
  }
}

// TODO:
/*
- Fix comments look and add a button below to add a comment directly through a box.
- Make clicking an emoji do not hide the keyboard
- Make comments / posts editable by the user. 
 */
