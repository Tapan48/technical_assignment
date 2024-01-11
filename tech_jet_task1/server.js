const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()
// const port=3000;
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.get("/", (req, res) => {
    res.send("Hello task1");
  });

//   app.get("/blog", (req, res) => {
//     res.send("blog World");
//   });    



  // get list of products
  app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});   ///  backend --->database
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get a product with particular id
app.get('/product/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})




/// add a product 
app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)   // product model
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


// update a product
app.put('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/product/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

  mongoose.                             /// cluster                     //database
  connect('mongodb+srv://admin:admin123@product-api.rs4rr0c.mongodb.net/products?retryWrites=true&w=majority',
  
)                 /// cluster,collection
  .then(() => {
      console.log('connected to MongoDB')
      app.listen(3000, ()=> {
          console.log(`Node API app is running on port 3000`)
      });
  }).catch((error) => {
      console.log(error)
  })