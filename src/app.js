import express from "express";
import ProductManager from "./productManager.js";


//
const pm = new ProductManager("./productsFile.json");

//Add products to PM
pm.addProduct({title:"Martillo", description:"HM", price:1000, thumbnail:"url", code:"code123", stock:100});
pm.addProduct({title:"Destornillador", description:"HM", price:1000, thumbnail:"url", code:"code124", stock:100});
pm.addProduct({title:"Pinza", description:"HM", price:1500, thumbnail:"url", code:"code125", stock:100});
pm.addProduct({title:"Tester", description:"HM", price:1500, thumbnail:"url", code:"code126", stock:100});
pm.addProduct({title:"Metro", description:"HM", price:500, thumbnail:"url", code:"code127", stock:100});
pm.addProduct({title:"Llave ajustable", description:"HM", price:900, thumbnail:"url", code:"code128", stock:100});

//
const PORT = 8080;
const app = express();
app.use(express.json());

//
app.get('/app/products', async (req, res) => {

    const products = await pm.getProducts()
    
    const limit = parseInt(req.query.limit)

    if(limit){
        const productsSlice = (products.slice(0, limit))
        res.json({productsSlice})
    } else{

        res.json({products})
    }

})

app.get('/api/products/:pid', async (req, res) => {
    
    const pId = Number(req.params.pid)
    const productById = await pm.getProductById(pId)

    if(productById){
        return res.json(productById)
    } else{
        return res.json('No existe producto con ese ID')
    }
})

app.listen(PORT, () => {
    console.log('Servidor comunicado al puerto 8080')
});