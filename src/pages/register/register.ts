import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../models/User';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  _User = {} as User; 
  constructor(public viewCtrl : ViewController , 
     public navCtrl: NavController,
      public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  // goes to the login page and closes this one.
  login()
  {
    this.navCtrl.push(LoginPage , {"splash" : false}); 
    this.viewCtrl.dismiss(); 
  }

}
