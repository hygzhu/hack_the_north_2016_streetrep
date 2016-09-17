

class Post {

postId: number;
username: string;
latitude: number;
longitude: number;
message: string;

constructor(postId: number, username: string, latitude:number, longitude:number, message:string) {
        this.postId = postId;
        this.username = username;
        this.latitude = latitude;
        this.longitude = longitude;
        this.message = message;  
    }

} 