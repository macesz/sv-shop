const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('mongoose')
const url = 'mongodb+srv://orshi:Lunatik14@cluster0.u5mgtyy.mongodb.net/svShop'

const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser("secret"));

// define the routes of static 
app.use(express.static('static'))

// routing for pages

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html')
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/signup.html')
})

app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/pages/products.html')
})

app.get('/product', (req, res) => {
    res.sendFile(__dirname + '/pages/product.html')
})

app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/pages/buy.html')
})


db.connect(url).then(() => console.log('db-on!'))


// schema for users

const userScema = new db.Schema({
    userName: String,
    userEmail: String,
    userPassword: String
})

//modell, collection for users

const userModel = db.model('users', userScema)

// regvalidate is an async func where we check the 
// email in the database and the db call is always an async func
const regvalidate = async (tempUser) => {
    let result = await userModel.findOne({ userEmail: tempUser.userEmail })

    // if we can find a document with the email address  then return with an error msg
    if (result != null) {
        return "user is already exsist"
    }
    // return empty error msg
    return ""
}

// here we use  res, req params as this is a web routing function 
// and we use async because we will 
// need access to the database (async - await)
app.post('/reg', async (req, res) => {
    // console.log(req.body);

    // define a user data structure that we will want to save to the DB
    let tempUser = {
        userName: req.body.name,
        userEmail: req.body.email,
        userPassword: req.body.password
    }

    // we call our validation function to know if the email adress is registered
    let error = await regvalidate(tempUser)

    // if the reg validteate func return with an error msg 

    if (error != "") {
        //response to the client with succsess 
        res.json({
            error: error,
            success: false,
        })
        return
    }
    // insert the datastructure in to the database
    await userModel.insertMany(tempUser)

    //response to the client with succsess 
    res.json({
        error: null,
        success: true,
    })
})

app.post('/check', async (req, res) => {

    let result = await userModel.findOne({ userEmail: req.body.email, userPassword: req.body.password })
    // if we found the user, then we storage it in a cookie session 
    // to be able to storage the user we want to add the products
    if (result != null) {
        let options = {
            maxAge: 1000 * 60 * 60, // would expire after 60 minutes
        }

        // Set cookie
        res.cookie('userName', result.userName, options) // options is optional
        res.cookie('userEmail', result.userEmail, options) // options is optional

    }

    res.json(result)
})

// schema for products

const productScema = new db.Schema({
    productName: String,
    productPrice: Number,
})

//modell, collection for products

const productModel = db.model('products', productScema)

// func for create and insert products
const creatProducts = async () => {

    await productModel.insertMany([
        { productName: "milk", productPrice: 15 },
        { productName: "bread", productPrice: 20 },
        { productName: "salami", productPrice: 30 },
        { productName: "shampoo", productPrice: 23 },
        { productName: "soap", productPrice: 14 },
        { productName: "pasta", productPrice: 11 },
        { productName: "tomato", productPrice: 4 },
        { productName: "bell peppers", productPrice: 9 }
    ]);
}

// call  for instert the products use get methode as we call from web browser, 
// used only once to creat the db (call me once then comment out)

// app.get('/createproducts', async (req, res) => {
//     await creatProducts()
//     res.json('products add succsesfully')
// })

app.get('/product/:id', async (req, res) => {

    productData = await productModel.find({ _id: req.params.id })

    console.log(productData)

    res.json(productData)
})

app.post('/getProduct', async (req, res) => {
    let sortBy = null
    // console.log(req.body);
    // here I want to know if we got a sort request and if it's by name or price
    if (req.body.sortBy == "byName") {
        sortBy = { productName: 1 }
    }
    if (req.body.sortBy == "byPrice") {
        sortBy = { productPrice: 1 }
    }

    // here we creat a promise to find the products
    let find = productModel.find()

    console.log(sortBy);
    // if we got a sort request we run a sort function on our results
    if (sortBy != null) {
        find = find.sort(sortBy)
    }

    // in order the get the results we waiting for the "find" promise
    result = await find

    res.json(result)
})


app.listen(port, () => console.log('server work on port 3000')) 