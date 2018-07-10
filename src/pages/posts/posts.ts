import { Component } from '@angular/core';
import { NavController, ToastController ,IonicPage } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Comment } from '../../models/Post';
import {RestfulProvider} from '../../providers/restful/restful'
import { AlertController } from 'ionic-angular';
import { InputmodelPage } from '../inputmodel/inputmodel';
import { EmoteProvider } from '../../providers/emote/emote';

import {LocalNotifications} from '@ionic-native/local-notifications'


@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})
export class PostsPage {

  _Posts : any
  _Comments : Comment[]; 
  numberTest:any; 
  _lastID : number; 
  coloring : string; 
  showSpin = true; 
  constructor(
    public localnotifications : LocalNotifications,
    public emote : EmoteProvider, 
    public toastCtrl : ToastController,
    public alertCtrl : AlertController , 
    public rest : RestfulProvider, 
    public navCtrl: NavController,
    public modalCtrl: ModalController) {

      if (localStorage.getItem("Color")){
        this.coloring= localStorage.getItem("Color"); 
      }
      else
      {
        // default color
      this.coloring = " rgb(22, 221, 175)"; 
      }
      // Getting all the posts by using the rest.service and pushing them into the _posts array.

      setInterval(() => {
        this.Refresher(); 
      }, 3000);

      rest.getAllPostsSub()
        .subscribe((data) =>{
        this._Posts = data["data"]; 
        var size = Object.keys(this._Posts).length; 
        for (var i=0; i<size; i++)
        {
          this._Posts[i]["created_at"]["date"]=
          this._Posts[i]["created_at"]["date"].split(".")[0]; 
          this._Posts[i]["content"] = emote.addEmotes(this._Posts[i]["content"]); 
        }
        this._lastID = this._Posts[0].id; 
        this.showSpin = false; 
      })


  }

      // creating a model when a post is clicked by sending to that modal the comments to be displayed.
  presentComments(id)
  {
    // here i make another http get cause its not implemented yet to retrieve the comments given the post ID.
    console.log("id sent to comments page" , id); 
    this.rest.getPostSub(id).subscribe((post)=>{
      console.log(post);
      this.modalCtrl.create("CommentsPage" , {"comments" 
      : post["data"]["comments"]  ,
    "postID" : id}).present();
      console.log("pressed");
    })    

  }

      // showing a prompt user input box to add a new post.
  addPost()
  {
    let modal = this.modalCtrl.create(InputmodelPage , {title : "Add Post"});
    modal.present(); 
    modal.onDidDismiss((data)=>{
      
     // PLEASE CHANGE THE RANDOM MATH VALUES WITH REAL USER IDS  ** IMPORTANT ** 
      // do stuff with the post 
      // add a new post over here
      this.rest.addPost((Math.ceil(Math.random()*15)).toString()
       , data);
      //this._Posts.unshift(createPost(data)); 
      // make a http post
    })
  }
  // add a comment to a post given its id
  changeColor()
  {
    let modal  =this.modalCtrl.create("ColorpickerPage"); 
    modal.present(); 
    modal.onDidDismiss((color)=>{
      localStorage.setItem("Color" , color); 
      this.coloring = color; 
    })
  }
  addComment(id)
  {
    let modal = this.modalCtrl.create(InputmodelPage , {title : "Add Comment"});
    modal.present(); 
    modal.onDidDismiss((comment)=>{
      // add a http post method to update the post given its id
      this.rest.addComment(comment , (Math.ceil(Math.random()*15)).toString() , id).subscribe(_ =>{

        this.toastCtrl.create({message: "Comment added" , duration: 800}).present(); 
      }); 
      console.log(comment); 
    })
  }
  Refresher()
  {
    this.rest.getPostSub(this._lastID+1).subscribe((post) =>{

      // notify when a post is added and the userID is not equal to the logged one now, add an if condition here
      //** CODE THE CONDITION **//
      this.localnotifications.schedule({
        id: 1,
        text: 'A new Post has been added:)',
      });
      
      post["data"]["content"] = this.emote.addEmotes(post["data"]["content"]); 
      this._Posts.unshift(post["data"]); 
      this._lastID+=1; 
    }, (err)=>{

    })
  }

  // a manual refresher by the user.
  doRefresh(refresher) {

    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);

  }
}
