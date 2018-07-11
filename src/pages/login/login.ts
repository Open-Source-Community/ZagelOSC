import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { User } from '../../models/User';
import { ToastController } from 'ionic-angular';
import { RestfulProvider } from '../../providers/restful/restful';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  _User = {} as User; 
  splash = true;
  constructor(
    public rest : RestfulProvider,
    public toastCtr : ToastController,
    public viewCtr : ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams) 
    {
      if(navParams.get("splash") == false)
      this.splash = false; 

    }

    ionViewDidLoad() {
      setTimeout(() => {
        this.splash = false;
        if (localStorage.getItem("ID") && localStorage.getItem("token"))
        {
          this.navCtrl.push("TabsPage"); 
          this.viewCtr.dismiss(); 
        }
      }, 4000);
    }
  

  // logs into the user
  public login()
  {
    // implement auth methods here..

    // this may look complex but it is fairly simple. I subscribe to the data from the login and assign the token to local storage and show a toast.
    // then i get the user's details by using this token and get his ID and name for further processing in other pages, thats it :D

    this.rest.login(this._User).subscribe((data)=>{
      localStorage.setItem("token" , data["success"]["token"]);
      const toast = this.toastCtr.create({
        message : "Successful login, redirecting..",
        duration : 1000,
      }); 
      toast.present(); 

      this.rest.getDetails(localStorage.getItem("token")).subscribe(data =>{
        localStorage.setItem("ID" , data["success"]["id"]);
        localStorage.setItem("Name" , data["success"]["name"]);
      });


      setTimeout(() => {
      this.navCtrl.push("TabsPage");
      this.viewCtr.dismiss(); 
      }, 1000);
    } , (err)=>{
      const toast = this.toastCtr.create({
        message : "Failed to login, wrong email or password",
        duration : 3000,
      });
      toast.present(); 
    }); 

  
  }

  // goes to the resgiter page and closing this one.
  public register()
  {
    this.navCtrl.push("RegisterPage"); 
    this.viewCtr.dismiss();
  }
}
