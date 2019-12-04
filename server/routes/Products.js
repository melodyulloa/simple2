
const express = require("express")
const productsRouter = express.Router();
const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const Product=require ("../models/Product");
process.env.SECRET_KEY = "secret";
//define router middleware

//define all routes here

// Get user's products
productsRouter.get('/products', verifyToken,(req,res)=>{
    var decoded = jwt.verify(req.token, process.env.SECRET_KEY);
    Product.findAll({
        where:{
            userId:decoded.id
        }
    })
    .then(products => {
         res.status(200).json({
             ourProductArr: products
         })
        
    })
    .catch(err => {
        res.send('error: '+ err);
    })
    
});

// Create new Product
productsRouter.post('/products',verifyToken,(req,res)=>{
    var decoded = jwt.verify(req.token, process.env.SECRET_KEY);

    const today = new Date();
    const productData = {
        product: req.body.product,
        userId: decoded.id ,
        category: req.body.category,
        quantity: req.body.quantity,
        cost: req.body.cost,
        totalCost: req.body.totalCost,
        salesPrice: req.body.salesPrice,
        createdAt: today
    };
    //check if email is already taken
    Product.findOne({
        where: {
            product: req.body.product,
            userId: decoded.id
        }
    })
        .then(product => {
            if(!product){  // if user is null, create new user record
            
                Product.create(productData)
                .then(product => {
                    
                    res.status(200).json({productData: product});
                })
                .catch(error => {
                    res.status(500).json({"error":error});
                })
            }else{
                res.status(422).json({"error": "Product already exists."});
            }
        })
        .catch(err => {
            res.send('error: '+ err);
            // res.status(422).json({"error": err});
        })
    // res.json({"message from post.users" : req.body.firstName});
});

// Delete product
productsRouter.delete('/products/:id',verifyToken,(req,res)=>{
    var decoded = jwt.verify(req.token, process.env.SECRET_KEY);
    
   
    //check if product exists
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(product => {
            Product.findAll({ // return updates table
                where:{
                    userId:decoded.id
                }
            })
            .then(products => {
                 res.status(200).json({
                     ourProductArr: products
                 })
                
            })
            .catch(err => {
                res.send('error: '+ err);
            })

            
        })
        .catch(err => {
            res.send('error: '+ err);
        })
});

// Update product
productsRouter.put('/products/:id',verifyToken,(req,res)=>{
    var decoded = jwt.verify(req.token, process.env.SECRET_KEY);
    
    
    //check if product exists
        Product.update(
            {
                product: req.body.product,
                category: req.body.category,
                quantity: req.body.quantity,
                cost: req.body.cost,
                totalCost: req.body.totalCost,
                salesPrice: req.body.salesPrice
            },
            {
                where: { id: req.params.id }
            }
        )
        .then(result => {
            Product.findAll({ // return updates table
                where:{
                    userId:decoded.id
                }
            })
            .then(products => {
                 res.status(200).json({
                     ourProductArr: products
                 })
                
            })
            .catch(err => {
                res.send('error: '+ err);
            })

            
        })
        .catch(err => {
            res.send('error: '+ err);
        })
});


// // Login
// usersRouter.post('/login',(req,res)=>{
//     //check if email exists
//     User.findOne({
//         where: {
//             email: req.body.email
//         }
//     })
//     .then(user => {

//         if (bcrypt.compareSync(req.body.password, user.password)){//user matched
//             //Create JWT payload
//             const payload = {
//                 id: user.id,
//                 name: user.name
//             };

//             //sign token
//             jwt.sign(payload, process.env.SECRET_KEY,{expiresIn: 1440},(err, token)=>{
//                 res.json({
//                     success: true,
//                     token: "Bearer " + token
//                 });
//             })
            
//             // let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
//             //     expiresIn: 1440
//             // })
//             // res.status(200).json({ token: token});
//         } else{
//             res.status(500).send('User does not match');
//         }
//     })
//     .catch(error => {
//         res.status(500).json({error : error});
//     });
// })

// // Protected Routes

// //Profile
// usersRouter.get('/profile', verifyToken, (req,res)=>{
    
    
//     var decoded = jwt.verify(req.token, process.env.SECRET_KEY)

//     User.findOne({
//         where:{
//             id: decoded.id
//         }
//     })
//     .then(user =>{

//         if(user){
            
//             let userInfo = {
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 email: user.email,
//                 company:user.company,
//                 companyAddress: user.companyAddress,
//                 companyCity: user.companyCity,
//                 companyState: user.companyState,
//             }
//             res.json(userInfo)
//         }else{
//             res.send('User does not exist')
//         }
//     })
//     .catch(err =>{
//         res.send('error:' + err)
//     })
// })


// // Custom middleware
function verifyToken(req,res,next){

    const bearerHeader = req.headers['authorization'];

    if(typeof(bearerHeader) !=='undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken
        next()   
    }else{
        res.sendStatus(403) //forbidden
    }
}


module.exports=productsRouter;
