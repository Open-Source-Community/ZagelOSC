import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  , ViewController} from 'ionic-angular';
import {ElementRef} from '@angular/core';

/**
 * Generated class for the InputmodelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-inputmodel',
  templateUrl: 'inputmodel.html',
})
export class InputmodelPage {

  post : string; 
  title : string; 
  constructor(public element:ElementRef,
     public viewCtrl : ViewController,
     public navCtrl: NavController, public navParams: NavParams) {

      this.title=navParams.get("title");
      this.post=""; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputmodelPage');
  }
  ngAfterViewInit(){
  }

  dismiss()
  {
    this.viewCtrl.dismiss(); 
  }
  addpost()
  {
    this.viewCtrl.dismiss(this.post); 
  }

  // this add a special notation to the emoji string so we can parse it and change it by giving it an image to be displayed as an emoji, OUR EMOJI <3.
  addEmoji(emoji)
  {
    if (this.post.length>0){
      this.post+=" " + "--" + emoji + "--"; 
    }
    else{
      this.post+="--" + emoji + "--";
    }
  }
}
