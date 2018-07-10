import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { InputmodelPage } from '../inputmodel/inputmodel';
import { ModalController } from 'ionic-angular';
import {createComment} from '../../models/Post'; 
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
    const temp_comments = navParams.get("comments"); 
    this.comments = [];
    var emojis = ["happy" , "hai" , "coding"];
    var size = Object.keys(temp_comments).length; 
    for (var i =size-1; i>=0; i--){
     
      temp_comments[i]["content"] = emote.addEmotes(temp_comments[i]["content"]); 
      this.comments.push(temp_comments[i]); 
    }
    console.log(this.comments); 
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
        this.postID).subscribe(d => console.log(d)); 
      this.comments.unshift(createComment(data));
    })
  }
  replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

}
