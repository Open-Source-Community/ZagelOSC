import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable()
export class EmoteProvider {

  constructor(public http: HttpClient) {
    console.log('Hello EmoteProvider Provider');
  }
  emojiList = ["happy" , "coding" , "hai" , "cool"]; // continue adding posts

  // a function to use the replace with Regx cause replace alone replaces one match only.
  replaceAll(str, find, replace) { 
    return str.replace(new RegExp(find, 'g'), replace);
}

  // returns a string by removing all the emotes special tags into an image tag containing images refering to the emoji tag.
  addEmotes(str)
  {
    var temp= str; 
    for (var i=0; i<this.emojiList.length; i++)
    {
      temp = this.replaceAll(temp , `--${this.emojiList[i]}--` ,  `<img src="assets/imgs/${this.emojiList[i]}.png" width="33px" height="27px">`);
    }
    return temp; 
  }
}
