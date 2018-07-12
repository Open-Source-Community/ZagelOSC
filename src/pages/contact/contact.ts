import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { RestfulProvider } from '../../providers/restful/restful';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  _allNames : any; 
  DisplayNames : any; 
  maxLen : number; 
  currentLen : number; 
  coloring = "rgb(22, 221, 175)";
  constructor(
    public viewCtr : ViewController,
    public toastCtr : ToastController, 
    public rest : RestfulProvider, 
    public navCtrl: NavController
  ) 
  {
    rest.getUsers().subscribe((name) =>{
      this._allNames= name["data"]; 
      this.currentLen = 10; 
      this.maxLen = this._allNames.length; 
      this.DisplayNames = this._allNames.slice(0,10); 
    })
  }
  ionViewDidEnter(){
    if (localStorage.getItem("Color"))
    this.coloring = localStorage.getItem("Color"); 
    }

  doInfinite(infiniteScroll){
    setTimeout(() => {
      let tempCount = this.currentLen; 
      if (this.currentLen+5 < this.maxLen){
      for (var i=tempCount; i<(tempCount+5) ; i++)
      {
        this.DisplayNames.push(this._allNames[i]); 
        this.currentLen++; 
      }
    }
    else{
      this.toastCtr.create({message: "End of the list" , duration: 800}).present(); 
    }
      infiniteScroll.complete();
    }, 500);

  }
 
}
