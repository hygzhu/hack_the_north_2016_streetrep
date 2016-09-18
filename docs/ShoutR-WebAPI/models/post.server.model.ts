

export class Post {

postId: string;
username: string;
latitude: number;
longitude: number;
message: string;
rating: number;
postDate: number;

constructor(
postId: string, 
username: string, 
latitude:number, 
longitude:number, 
message:string, 
rating: number) {
        this.postId = postId;
        this.username = username;
        this.latitude = latitude;
        this.longitude = longitude;
        this.message = message;  
        this.rating = rating;
        this.postDate = Date.now();
    }
} 