export default class Pokemon{
    constructor(name = null,
        height = null,
        types = null, 
        url = null,
        image = null){

        this.name = name;
        this.height = height;
        this.types = types;
        this.url = url;
        this.image = image;
    }

    get getName(){
        return this._name;
    }
    get getHeight(){
        return this._height;
    }
    get getType(){
        return this._type;
    }
    get getUrl(){
        return this._url;
    }
    get getImage(){
        return this._image;
    }

    set name(newName){
        if (typeof newName === "string" || newName instanceof String) this._name = newName;
    }
    set height(newHeight){
        if (typeof newHeight === "number" || newHeight instanceof Number) this._height = newHeight;
    }
    set types(newTypes){
        if (Array.isArray(newTypes) || typeof newURL === "string") this._types = newTypes;
    }
    set url(newURL){
        if (typeof newURL === "string" || newURL instanceof String) this._url = newURL;
    }
    set image(newImage){
        if (typeof newImage === "string" || newImage instanceof String) this._image = newImage;
    }
}