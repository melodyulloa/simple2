
const express = require("express")
const usersRouter = express.Router();
const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const User=require ("../models/User");
process.env.SECRET_KEY = "secret";
//define router middleware

//define all routes here
usersRouter.get('/users',(req,res)=>{
    res.json({"message" : "All users"});
});

// Register
usersRouter.post('/users',(req,res)=>{
    const today = new Date();
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        createdAt: today
    };
    //check if email is already taken
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if(!user){  // if user is null, create new user record
                const hash = bcrypt.hashSync(userData.password,10); // encrypt password
                userData.password = hash;
                User.create(userData)
                .then(user => {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{expiresIn : '365d'});
                    res.status(200).json({token: token});
                })
                .catch(error => {
                    res.status(500).json({"error":error});
                })
            }else{
                res.status(422).json({"error": "Email is already taken."});
            }
        })
        .catch(err => {
            res.send('error: '+ err);
            // res.status(422).json({"error": err});
        })
    // res.json({"message from post.users" : req.body.firstName});
});

// Login
usersRouter.post('/login',(req,res)=>{
    //check if email exists
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {

        if (bcrypt.compareSync(req.body.password, user.password)){//user matched
            //Create JWT payload
            const payload = {
                id: user.id,
                name: user.name
            };

            //sign token
            jwt.sign(payload, process.env.SECRET_KEY,{expiresIn: 1440},(err, token)=>{
                res.json({
                    success: true,
                    token: "Bearer " + token
                });
            })
            
            // let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
            //     expiresIn: 1440
            // })
            // res.status(200).json({ token: token});
        } else{
            res.status(500).send('User does not match');
        }
    })
    .catch(error => {
        res.status(500).send("We can't find that username and password.");
    });
})

// Protected Routes

//Profile
usersRouter.get('/profile', verifyToken, (req,res)=>{
    
    
    var decoded = jwt.verify(req.token, process.env.SECRET_KEY)

    User.findOne({
        where:{
            id: decoded.id
        }
    })
    .then(user =>{

        if(user){
            
            let userInfo = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                company:user.company,
                companyAddress: user.companyAddress,
                companyCity: user.companyCity,
                companyState: user.companyState,
            }
            res.json(userInfo)
        }else{
            res.send('User does not exist')
        }
    })
    .catch(err =>{
        res.send('error:' + err)
    })
})


// Custom middleware
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


module.exports=usersRouter;