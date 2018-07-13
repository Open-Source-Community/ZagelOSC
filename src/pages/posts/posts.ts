import { Component } from '@angular/core';
import { NavController, ToastController ,IonicPage } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Comment } from '../../models/Post';
import {RestfulProvider} from '../../providers/restful/restful'
import { AlertController } from 'ionic-angular';
import { InputmodelPage } from '../inputmodel/inputmodel';
import { EmoteProvider } from '../../providers/emote/emote';

import {LocalNotifications} from '@ionic-native/local-notifications'
import { _ParseAST } from '@angular/compiler';


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
  _firstID : number; 
  coloring : string; 
  _LocalID : string; 
  _loaded : boolean; 
  showSpin = true; 
  constructor(
    public localnotifications : LocalNotifications,
    public emote : EmoteProvider, 
    public toastCtrl : ToastController,
    public alertCtrl : AlertController , 
    public rest : RestfulProvider, 
    public navCtrl: NavController,
    public modalCtrl: ModalController) {

      this._loaded = true; 

      this._LocalID = localStorage.getItem("ID"); 

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
          this._Posts[i]["content"] = emote.addEmotes(this._Posts[i]["content"]); 
        }
        this._lastID = this._Posts[0].id; 
        this._firstID = this._Posts[this._Posts.length-1].id; 
        this.showSpin = false; 
      })


  }
  ionViewDidEnter(){
    if (localStorage.getItem("Color"))
    this.coloring = localStorage.getItem("Color"); 

    // if (this._loaded == false){
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    // }
    // else{
    //   this._loaded = false; 
    // }
    }

      // creating a model when a post is clicked by sending to that modal the comments to be displayed.
  presentComments(id)
  {
    // here i make another http get cause its not implemented yet to retrieve the comments given the post ID.
    this.modalCtrl.create("CommentsPage" , {
    "postID" : id}).present();
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
      this.rest.addPost(this._LocalID
       , data);
      //this._Posts.unshift(createPost(data)); 
      // make a http post
    })
  }
  // add a comment to a post given its id

  addComment(id)
  {
    let modal = this.modalCtrl.create(InputmodelPage , {title : "Add Comment"});
    modal.present(); 
    modal.onDidDismiss((comment)=>{
      // add a http post method to update the post given its id
      this.rest.addComment(comment , this._LocalID , id).subscribe(_ =>{

        this.toastCtrl.create({message: "Comment added" , duration: 800}).present(); 
      }); 
    })
  }
  Refresher()
  {
    this.rest.getPostSub(this._lastID+1).subscribe((post) =>{

      // notify when a post is added and the userID is not equal to the logged one now, add an if condition here
      //** CODE THE CONDITION **//
      if (post["data"]["user"]["id"] != localStorage.getItem("ID")){
      this.localnotifications.schedule({
        id: 1,
        text: 'A new Post has been added:)',
      });
    }
      
      post["data"]["content"] = this.emote.addEmotes(post["data"]["content"]); 
      this._Posts.unshift(post["data"]); 
      this._lastID+=1; 
    }, (err)=>{

    })
  }

  // a manual refresher by the user.
  doRefresh(refresher) {


    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  doInfinite(infiniteScroll){
    setTimeout(() => {
      for(var i=1; i<=5; i++){
        this.rest.getPostSub(this._firstID-i).subscribe((post)=>{
          post["data"]["content"]= this.emote.addEmotes(post["data"]["content"]);
          this._firstID--; 
          this._Posts.push(post["data"]);
        } , (err => {
          i =7; 
          if (err["status"] == 429 || err["status"] == "429"){
          }
          else
          this.toastCtrl.create({message : "No more to show" , duration : 2000}).present(); 
        }))
      }
      infiniteScroll.complete();
    }, 500);
  }

  fixDates(str){
    const date = str.split('.')[0];
    
    return date;  
  }
  addCommentsNumber(post){
    return  Object.keys(post["comments"]).length;
  }
}
