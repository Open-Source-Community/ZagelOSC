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
  constructor(
      public emote : EmoteProvider, 
      public rest : RestfulProvider,
      public modalCtrl: ModalController ,
      public navCtrl: NavController, 
      public navParams: NavParams ,
      public viewCtrl : ViewController) {
   
    this.showComments();
    this.postID = navParams.get("postID"); 


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }
  cancel()
  {
    this.viewCtrl.dismiss();

  }
  addComment()
  {
    console.log(this.postID); 
    let modal = this.modalCtrl.create(InputmodelPage , {title : "Add Comment"});
    modal.present(); 
    modal.onDidDismiss((data)=>{
      console.log(data); 
      this.rest.addComment(data , 
        (Math.ceil(Math.random()*20)).toString(), 
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
    for (var i =size-1; i>=0; i--){
     
      temp_comments[i]["content"] = this.emote.addEmotes(temp_comments[i]["content"]); 
      this.comments.push(temp_comments[i]); 
    }
  }); 

}

}
