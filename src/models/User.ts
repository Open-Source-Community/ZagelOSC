export interface User{
    name?:string,
    email:string, 
    password:string, 
    id?:number,
    imageURL?: string, 
    created_at? : any, 
    updated_at? : any,
    token? : string, 
    c_password?: string,
}