export default class Products{
    constructor(title, description, price, thumbnail, code, stock, id=0){

        if(!title){throw new Error()}
        if(!description){throw new Error()}
        if(!price){throw new Error()}
        if(!thumbnail){throw new Error()}
        if(!code){throw new Error()}
        if(!stock){throw new Error()}

        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock,
        this.id = id
    }
};