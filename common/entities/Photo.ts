import {Utils} from "../Utils";
import {Directory} from "./Directory";
export class Photo {
    constructor(public id:number, public name:string, public width:number, public height:number) {
    }

    public static getThumbnailPath(directory:Directory,photo:Photo){
        return Utils.concatUrls("/api/gallery",directory.path,directory.name,photo.name,"thumbnail");
    }
    public static  getPhotoPath(directory:Directory,photo:Photo){
        return Utils.concatUrls("/api/gallery",directory.path,directory.name,photo.name);
    }
}