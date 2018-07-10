import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  , ViewController} from 'ionic-angular';

/**
 * Generated class for the ColorpickerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    console.log('ionViewDidLoad ColorpickerPage');
  }
  setColor(color){
    this.viewCtrl.dismiss(color); 
  }

}
