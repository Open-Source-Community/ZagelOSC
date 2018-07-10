import { User } from "./User";

export interface Post{
    content : string , 
    id? : number , 
    user? : User
    comments? : Comment[] , 
    created_at? :_Date , 


    // will add created_at , updated_at later.
}

export interface Comment{
    id?  : number , 
    content? : string , 
    created_at? : Date , 
    updated_at?: Date,
    user? : User, 
}

export function createPost(content)
{
let newPost= {} as Post; 
newPost.content = content; 
newPost.id =100; 
let user = {} as User; 
user.name="Taher for now"; 
user.email = "Tahrr@taher..come"; 
newPost.user = user; 
newPost.comments = [];
newPost.created_at = {} as _Date; 
let DateNow = new Date(); 
newPost.created_at.date = DateNow.getDate().toString(); 
return newPost; 
}

export function createComment(content)
{
    let newComment = {} as Comment; 
    newComment.content = content; 
    newComment.user = {} as User; 
    newComment.user.name = "Test el comment aho ya bashaaar" // add the localstorage name of the user.
    newComment.user.id = 1 // user number.
    return newComment;
}


export interface _Date{
    date: string,
    timezone_type: number,
    timezone: string, 
}