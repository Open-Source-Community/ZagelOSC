import { Component } from '@angular/core';
import { NavController, ToastController ,IonicPage } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Comment } from '../../models/Post';
import {RestfulProvider} from '../../providers/restful/restful'
import { AlertController } from 'ionic-angular';
import { InputmodelPage } from '../inputmodel/inputmodel';
import { EmoteProvider } from '../../providers/emote/emote';

import {LocalNotifications} from '@ionic-native/local-notifications'
import { Platform } from 'ionic-angular/platform/platform';


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
  _pageNum = 1; 
  _postsPageNum=2; // as we ask for 1 at the start.
  showSpin = true; 
  constructor(
    public platform : Platform,
    public localnotifications : LocalNotifications,
    public emote : EmoteProvider, 
    public toastCtrl : ToastController,
    public alertCtrl : AlertController , 
    public rest : RestfulProvider, 
    public navCtrl: NavController,
    public modalCtrl: ModalController) {

      // platform.ready().then(_ =>{
      //   localnotifications.on("click").subscribe((d)=>{
      //     if (d.id !=0){
      //     this.modalCtrl.create("CommentsPage" , {
      //       "postID" : d.id}).present();
      //   }
      // }
      // );
        
      // })

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
        this.gatherNotifications(); 
      }, 5000);

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
      this.rest.addPost(data);
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
      this.rest.addComment(comment , id).subscribe(_ =>{

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
      // this.localnotifications.schedule({
      //   id: 5,
      //   text: 'A new Post has been added:)',

      // });
      this.localnotifications.schedule([
        { id: 0, title : "Ding Ding" , text : "New Post has been added"  },

    ]);
      
    }
      
      post["data"]["content"] = this.emote.addEmotes(post["data"]["content"]); 
      this._Posts.unshift(post["data"]); 
      this._lastID+=1; 
    }, (err)=>{

    });
    
  }

  // a manual refresher by the user.
  doRefresh(refresher) {


    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      refresher.complete();
    }, 200);
  }
  doInfinite(infiniteScroll){
    
   
    setTimeout(() => {
      this.rest.getPostPage(this._postsPageNum).subscribe((data)=>{
        let posts = data["data"]; 
        for (var i=0; i<Object.keys(posts).length; i++){
          posts[i]["content"] = this.emote.addEmotes(posts[i]["content"]); 
        }
        for (var i=0; i<Object.keys(posts).length; i++){
          this._Posts.push(posts[i]); 
        }
      }, (err)=>{console.log(err);
        this.toastCtrl.create({message : "List of posts finished" , duration :1500}).present();
        })
        this._postsPageNum++ ; 
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

  gatherNotifications(){
this.rest.getNotified(this._pageNum).subscribe((data) =>{
  console.log(data); 
  let done_read = false; 
  let collected_notifiers = new Set;
  let notifarr = data["notifications"]["data"];
  console.log("notifier array" , notifarr);
  let size  = Object.keys(notifarr).length; 
  console.log("size " , size); 
  for (var i =0; i<size; i++)
  {
    if(notifarr[i]["read_at"]){   
      console.log("read at",notifarr[i]["read_at"])                                         //|| notifarr[i]["read_at"]===null){
      done_read = true; 
      console.log("break at" , i);
      break; 
    }
    else{
      collected_notifiers.add(notifarr[i]["data"]["post_id"]);
    }
  }
  console.log(collected_notifiers); 
  if ( done_read==false){
    this._pageNum++; 
  }
  else
  {
    this._pageNum = 1; 
  }
  if (collected_notifiers.size<1){
    return; 
  }

  for (var it = collected_notifiers.values(), val= null; val=it.next().value; ) {
    this.localnotifications.schedule({
      id : val , 
      text : "Someone Commented on a post you participated in", 
      title : "Woot, comments are here"
    })
}
  this.rest.readNotifications().subscribe((d)=>{ }); 
})
    
  }
}
