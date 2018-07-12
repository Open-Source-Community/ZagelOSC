import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App, ToastController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {Pro} from '@ionic/pro';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public deployChannel = "";
  public isBeta = false;
  public downloadProgress = 0;
  coloring : string; 
  constructor(
    public alertCtrl: AlertController,
    public toastCtrl : ToastController,
    public app : App,
    public modalCtrl : ModalController, 
    public navCtrl: NavController,
    public navParams: NavParams) {
      if (localStorage.getItem("Color")){
        this.coloring = localStorage.getItem("Color"); 
      }
      else{
        this.coloring = " rgb(22, 221, 175)"; 
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  changeColor()
  {
    let modal  =this.modalCtrl.create("ColorpickerPage"); 
    modal.present(); 
    modal.onDidDismiss((color)=>{
      if(color){
      localStorage.setItem("Color" , color); 
      this.coloring = color; 
      }
    })
  }

  logout(){
    localStorage.clear(); 
    this.app.getRootNav().setRoot(LoginPage);   

  }

  async performManualUpdate() {

    
    /*
      Here we are going through each manual step of the update process:
      Check, Download, Extract, and Redirect.
      This code is currently exactly the same as performAutomaticUpdate,
      but you could split it out to customize the flow.

      Ex: Check, Download, Extract when a user logs into your app,
        but Redirect when they logout for an app that is always running
        but used with multiple users (like at a doctors office).
    */
   try {
    const haveUpdate = await Pro.deploy.check();

    if (haveUpdate){
   let alert = this.alertCtrl.create({
    title: 'Confirm Update',
    message: 'there is a new update, wanna go forward?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'Update',
        handler: () => {
          this.manualUpdate(); 
        }
      }
    ]
  });
  alert.present();
    }
    else {
      this.toastCtrl.create({
        message: "No updates found bud", 
        duration: 2000 ,
      }).present(); 
    }
  }
  catch(err){

  }
  }

  async manualUpdate(){
          
        this.downloadProgress = 0;

        await Pro.deploy.download((progress) => {
          this.downloadProgress = progress;
        })
        await Pro.deploy.extract();
         Pro.deploy.redirect().then((done)=>{
           const toast = this.toastCtrl.create({
             message : "Update is complete", 
             duration : 1800
           }); 
           toast.present(); 
           toast.onDidDismiss(function(){
            this.app.getRootNav().setRoot("SplashPage");   
           })
         });
      }
      checkVersion(){
        this.toastCtrl.create({
          message : "Version number 1.0.0",
          duration : 1900,
        }).present(); 
      }

}
