//imports usando paradigma de módulos.
import { writeFile, readFile } from 'fs/promises';
import Products from './products.js';

export default class ProductManager{
    
    constructor(path){
        this.path = path,
        this.products = []
    };

    //Add products to Array
    async addProduct({title, description, price, thumbnail, code, stock}){

        const product = new Products(title,description,price,thumbnail,code,stock)

        //Validation
        if(Object.values(product).some(atribute => (atribute === '' || atribute === undefined))){

            return console.log("Todos los campos del producto deben estar completos")

        } else{

            if(this.products.length === 0){
                
                product.id = 1 
                this.products.push(product)
                const productsJson = JSON.stringify(this.products, null, '\t')
                writeFile(this.path, productsJson) //Write a file with the array of objects
                    
            } else{

                //Validation
                if(this.products.some(prod => prod.code === product.code)){
                    
                    //throw new Error("No pueden existir dos CODE iguales")
                    return console.log("No pueden existir dos CODE iguales")
                    
                } else{
                    
                    product.id = this.products[this.products.length - 1].id + 1 //cambiar método de id autoincrementable
                    this.products.push(product)
                    const productsJson = JSON.stringify(this.products, null, '\t')
                    writeFile(this.path, productsJson)
                }                
            }
        }
    };

    async getProducts(){
        return JSON.parse(await readFile(this.path, 'utf-8'))
    };

    async getProductById(id){

        const asStringify = await readFile(this.path, 'utf-8')
        const asJson = JSON.parse(asStringify)
        return asJson.find(prod => prod.id === id)
    };

    async updateProduct(id, keysAndValues){

        const asStringify = await readFile(this.path, 'utf-8')
        const asJson = JSON.parse(asStringify)
        
        const index = await asJson.findIndex(prod => prod.id === id)
        asJson[index] = { 
            ...asJson[index], 
            ...keysAndValues 
        }

        const arrayStringify = JSON.stringify(asJson, null, '\t')
        await writeFile(this.path, arrayStringify)
    }

    async deleteProduct(id){

        const asStringify = await readFile(this.path, 'utf-8')
        const asJson = await JSON.parse(asStringify)

        const position = id-1
        console.log(position)
        asJson.splice(position, 1)

        const arrayStringify = JSON.stringify(asJson, null, '\t')
        await writeFile(this.path, arrayStringify)
    }
};