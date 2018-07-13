import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from '../../models/User'; 
import { ToastController } from 'ionic-angular';

// BIG NOTE..: there is a difference between functions that contains Sub at its end and other ones.
// Sub ones sends back an observable to be subscribed on directly, the other ones sends back a Promise.
// Both Actually works, subscribing on observables were a bit better thats why i left it.

@Injectable()
export class RestfulProvider {

  _User = {} as User; 
  _apiLink : string; 
  _DummieLink : string;  // dummie link for testing purposes.
  constructor(
     public toastCtrl : ToastController , 
     public http: HttpClient) {

    this._DummieLink = "http://localhost:8100/api";
    this._apiLink = "http://zagel.oscgeeks.org/api"; 
    // this._apiLink = this._DummieLink ; // for now, change it in the production line    
  }


  // *** POSTS SECTION ****//

  // get all posts the subscribing version.
 public getAllPostsSub()
  {
    let h = new HttpHeaders({
      'Authorization' : 'Bearer ' + localStorage.getItem("token")
    });
    return this.http.get(`${this._apiLink}/posts` , {headers : h});
  }
  public getPostSub(id)
  {
    let h = new HttpHeaders({
      'Authorization' : 'Bearer ' + localStorage.getItem("token")
    });
    return this.http.get(`${this._apiLink}/posts/${id}` , {headers : h})
  }


  getAllPosts()
  {
    let h = new HttpHeaders({
      'Authorization' : 'Bearer ' + localStorage.getItem("token")
    });
    return new Promise((resolve , reject) => {
      this.http.get(`${this._apiLink}/posts` , {headers : h}).toPromise().then((data)=>{
        resolve(data); 
      }).catch((err)=>{
        reject(err); 
      })
    })
  }
  getPost(id){
    try{
      let h = new HttpHeaders({
        'Authorization' : 'Bearer ' + localStorage.getItem("token")
      });
    return new Promise((resolve, reject)=>{
      this.http.get(`${this._apiLink}/post/${id}` , {headers : h}).toPromise().then((post)=>{
        resolve(post); 
      }).catch((err) => reject(err))
    })
  }
  catch(err)
  {
  }
  }
  // adding a new post given a user id and a content.
  addPost(id : string , content : string) 
  {
    let h = new HttpHeaders({
      'Authorization' : 'Bearer ' + localStorage.getItem("token")
    });
    this.http.post(`${this._apiLink}/posts` , {	
    "content": content,
    "user_id": id} , {headers : h}).subscribe(d => console.log(d) , e => console.log(e));
  }

  // add a comment to a given post ID
  addComment(content : string , userID : string , postID : string)
  {
    let h = new HttpHeaders({
      'Authorization' : 'Bearer ' + localStorage.getItem("token")
    });
   return this.http.post(`${this._apiLink}/comments` , {
      "content": content,
      "user_id": userID,
      "post_id": postID
    } , {headers : h})
  }


    // ** USERS SECTION ** //


  getDetails(token : string){
    let h = new HttpHeaders({
      'Authorization' : 'Bearer ' + token
    });
    return this.http.get(`${this._apiLink}/get-details` ,  {headers: h});
  }


  login(user : User){
    return this.http.post(`${this._apiLink}/login` , user); 
  }

  register(user : User)
  {
    return this.http.post(`${this._apiLink}/register` , user);
  }
  createUser(user : User)
  {
    this.http.post(`${this._apiLink}` , user).toPromise()
    .then((response)=>{
      //do something when reciveing the answer.
    }).catch(err =>{
      //catch the error
    });
  }
  
  getUsers()
  {
    return this.http.get(`${this._apiLink}/users`); 
  }
}
