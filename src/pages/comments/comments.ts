import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { InputmodelPage } from '../inputmodel/inputmodel';
import { ModalController } from 'ionic-angular';
import { RestfulProvider } from '../../providers/restful/restful';
import { EmoteProvider } from '../../providers/emote/emote';



@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  comments : any; 
  postID : any; 
  coloring = "rgb(22, 221, 175)";
  constructor(
      public emote : EmoteProvider, 
      public rest : RestfulProvider,
      public modalCtrl: ModalController ,
      public navCtrl: NavController, 
      public navParams: NavParams ,
      public viewCtrl : ViewController) {
   
    this.showComments();
    this.postID = navParams.get("postID"); 
    if (localStorage.getItem("Color"))
    {
      this.coloring = localStorage.getItem("Color"); 
    }


  }

  ionViewDidLoad() {
  }
  cancel()
  {
    this.viewCtrl.dismiss();

  }
  addComment()
  {
    let modal = this.modalCtrl.create(InputmodelPage , {title : "Add Comment"});
    modal.present(); 
    modal.onDidDismiss((data)=>{
      this.rest.addComment(data , 
        localStorage.getItem("ID"), 
        this.postID).subscribe(_ => this.showComments()); 
    })
  }
  replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
showComments()
{
  const temp_post_comments = this.navParams.get("postID"); 
  var temp_comments; 
  this.comments=[];
    this.rest.getPostSub(temp_post_comments).subscribe((post) =>{
    temp_comments  = post["data"]["comments"]; 
    this.comments = [];
    var size = Object.keys(temp_comments).length; 
    for (var i =0; i<size; i++){
     
      temp_comments[i]["content"] = this.emote.addEmotes(temp_comments[i]["content"]); 
      this.comments.push(temp_comments[i]); 
    }
  }); 

}
fixDates(str){
  const date = str.split('.')[0];
  return date.split(" ")[1];  
}
doRefresh(refresher) {


  setTimeout(() => {
    this.showComments();
    refresher.complete();
  }, 800);
}
}
