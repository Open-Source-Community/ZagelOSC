import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';

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

  coloring : string; 
  constructor(
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
}
