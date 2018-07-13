import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  , ViewController} from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-colorpicker',
  templateUrl: 'colorpicker.html',
})
export class ColorpickerPage {

  constructor(
    public viewCtrl : ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  setColor(color){
    this.viewCtrl.dismiss(color); 
  }

}
