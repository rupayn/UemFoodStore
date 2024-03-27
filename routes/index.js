var express = require('express');
var router = express.Router();
const userModel =require('./users');
const menuModel =require('./menu')
const orderModel =require('./order')
const passport=require('passport')
let session= require('express-session')
let bodyParser = require('body-parser');
const moment = require("moment") 

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
const orderController=require('../controller/order.controller')
const adminOrderController=require('../controller/admin/order.controller')
const admin=require("./admin.middle")

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


// Admin routes

// router.get("/admin/orders",admin,adminOrderController().index)




// router.get("/admin/orders",async(req,res)=>{
//   // const orders = await orderModel.find({ status: { $ne: 'completed' } }).sort({ 'createdAt': -1 }).populate('user', '-password').exec();
//   // let uname=req.globalSession
//   let uname=req.globalSession
//   let orders= await orderModel.find({user: req.user._id},null,{ sort: { 'createdAt':-1 } })
  
//   res.render('admin/orders', { orders,user:uname});
// })


module.exports = router;

// router.get('/login', (req, res) => {
//   res.render('login',{ layout: false });
// });