import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../models/User';
import { RestfulProvider } from '../../providers/restful/restful';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  _User = {} as User; 
  constructor(
      public toastCtr : ToastController,
      public rest : RestfulProvider,
      public viewCtrl : ViewController, 
      public navCtrl: NavController,
      public navParams: NavParams
    ) 
    {
    }

  ionViewDidLoad() {
  }


  // goes to the login page and closes this one.
  login()
  {
    this.navCtrl.push(LoginPage , {"splash" : false}); 
    this.viewCtrl.dismiss(); 
  }

  register()
  {
    this.rest.register(this._User).subscribe((data) =>{
      localStorage.setItem("token" , data["success"]["token"]);
      const toast = this.toastCtr.create({
        message : `Successful Registration ${this._User.name}  , redirecting..`,
        duration : 1000,
      }); 
      toast.present(); 
      this.rest.getDetails(localStorage.getItem("token")).subscribe(data =>{
        localStorage.setItem("ID" , data["success"]["id"]);
        localStorage.setItem("Name" , data["success"]["name"]);
      });


      setTimeout(() => {
      this.navCtrl.push("TabsPage");
      this.viewCtrl.dismiss(); 
      }, 1000);
    }, (err)=>{
      const toast = this.toastCtr.create({
        message : "Error in registration, probably the email has been already registerd. Try logging with it.",
        duration: 2500
      });
      toast.present(); 
    });
  }

}
