var express = require('express');
var router = express.Router();

const menuModel =require('./menu')
const orderModel =require('./order')
const passport=require('passport')

let bodyParser = require('body-parser');
const moment = require("moment") 

router.use(bodyParser.json())
// Custom middleware to access session globally
router.use((req, res, next) => {
  // Access the session object from the request
  req.globalSession = req.session;
 
  next();
});
const authController=require('../controller/auth.controller')
const cartController=require('../controller/cart.controller')
const orderController=require('../controller/order.controller')


/* GET home page. */
router.get('/register', (req,res)=>{
  let uname=req.globalSession


  res.render('auth/signup',{ layout: false,user:uname });
})  ;

router.post("/register", authController().postsignup);

router.get('/login',(req, res)=>{
  
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
  
  
});
router.get('/cart',isLoggedIn, (req, res) => {
  let uname=req.globalSession;
  scart=req.session.cart;
  
  
  res.render('customer/cart',{user:uname,scart});
});

router.post('/update-cart',cartController.update)


router.get('/contact-us', (req, res) => {
  let uname=req.globalSession
  res.render('customer/contactUs',{user:uname});
});



router.post('/orders',orderController().store)
router.get('/orders',isLoggedIn,async(req,res) => {
  let uname=req.globalSession
  orders= await orderModel.find({ user: req.user._id },null,{ sort: { 'createdAt':-1 } })
  if(req.user.role!='admin'){ 
  res.render('customer/orders',{user:uname,orders:orders,moment:moment});
  }else{
  orders= await orderModel.find({ 
    paymentType: "COD" },null,{ sort: { 'createdAt':1 } })
  
  res.render('admin/orders',{user:uname,orders:orders});
  }

})
router.get('/admin/aorders',isLoggedIn,async(req,res) => {
  let uname=req.globalSession
  orders= await orderModel.find({ 
    paymentType: "COD" },null,{ sort: { 'createdAt':-1 } })
  
  res.render('admin/orders',{user:uname,orders:orders});

})







module.exports = router;