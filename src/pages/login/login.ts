import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { User } from '../../models/User';
import { ToastController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  _User = {} as User; 
  splash = true;
  constructor(
    public toastCtr : ToastController,
    public viewCtr : ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams) 
    {
      if(navParams.get("splash") == false)
      this.splash = false; 
    }

    ionViewDidLoad() {
      setTimeout(() => this.splash = false, 4000);
    }
  

  // logs into the user
  public login()
  {
    // implement auth methods here..


    const toast = this.toastCtr.create({
      message : "Successful login, redirecting..",
      duration : 1000,
    }); 
    toast.present(); 

    setTimeout(() => {
    this.navCtrl.push("TabsPage");
    this.viewCtr.dismiss(); 
    }, 1000);
  }

  // goes to the resgiter page and closing this one.
  public register()
  {
    this.navCtrl.push("RegisterPage"); 
    this.viewCtr.dismiss();
  }
}
