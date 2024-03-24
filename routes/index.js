var express = require('express');
var router = express.Router();
const userModel =require('./users');
const menuModel =require('./menu')
const orderModel =require('./order')
const passport=require('passport')
let bodyParser = require('body-parser');
let session= require('express-session')

router.use(bodyParser.json())
// Custom middleware to access session globally
router.use((req, res, next) => {
  // Access the session object from the request
  req.globalSession = req.session;
  // console.log(req.globalSession.passport);
  // req.globalSession;
  // console.log(`hi ${a}`);
  next();
});
const authController=require('../controller/auth.controller')
const cartController=require('../controller/cart.controller')
// const localStrategy=require('passport-local')
const plm=require('passport-local-mongoose')

// passport.use(new localStrategy(userModel.authenticate()))
/* GET home page. */
router.get('/register', (req,res)=>{
  let uname=req.globalSession


  res.render('auth/signup',{ layout: false,user:uname });
})  ;

router.post("/register", authController().postsignup);

router.get('/login',(req, res)=>{
  
  // console.log(uname);
  res.render('auth/login',{ layout: false });
},);
router.post('/login',passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: '/login' 

}) , function(req, res) {
}

);

router.get('/logout',authController().logout)

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())return next();
  res.redirect("/login"); 
}

router.get('/',(req, res) => {
  let uname=req.globalSession
  res.render('index',{user:uname});
});
router.get('/items',isLoggedIn, async(req, res) => {
  let uname=req.globalSession
  
    const menus = await menuModel.find()
    res.render('items',{menus,user:uname});
  
  // res.render('items');
});
router.get('/cart',isLoggedIn, (req, res) => {
  let uname=req.globalSession;
  scart=req.session.cart;
  // console.log(scart.items);
  
  res.render('customer/cart',{user:uname,scart});
});

router.post('/update-cart',cartController.update)


router.get('/contact-us', (req, res) => {
  let uname=req.globalSession
  res.render('customer/contactUs',{user:uname});
});



router.get("/createorder",async function(req,res,next){
  let CreatedOrder=await orderModel.create({
    customerName: "Dev",
    items: [{
      // Assuming a simple schema for items
      name: "Chicken",
      quantity: 100,
      price: 100
    }],
    user:"65f4895a122f210555f01715",
  })
  let user=await userModel.findOne({
    _id:"65f4895a122f210555f01715",
  })
  user.order.push(CreatedOrder._id);
  await user.save();

  res.send(CreatedOrder)
})



module.exports = router;

// router.get('/login', (req, res) => {
//   res.render('login',{ layout: false });
// });