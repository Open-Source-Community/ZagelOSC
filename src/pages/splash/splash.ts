import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { LoginPage } from '../login/login';
import { RestfulProvider } from '../../providers/restful/restful';



@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  splash = true; 
  constructor(
    public rest : RestfulProvider,
    public viewCtrl : ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.splash = false;
      
      if (localStorage.getItem("ID") && localStorage.getItem("token"))
      {
        this.navCtrl.push("TabsPage"); 
        this.viewCtrl.dismiss(); 
      }
      else{
        this.navCtrl.push(LoginPage); 
        this.viewCtrl.dismiss(); 
      }
    }, 4000);
  }


}
