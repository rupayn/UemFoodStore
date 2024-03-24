const orderModel=require("../routes/order")

function orderController (){
    return{
        async index(req,res){
            orders= await orderModel.find({ user: req.user._id })
            res.render('customer/orders')
        },
        store(req,res){
            // Validate order
            const { phone,address}=req.body;
            if(!phone||!address){
                return res.redirect('/cart')
            }
            // let a=req.session.cart.items;
            // console.log(a[""]["name"])
            const order= new orderModel({
                customerName:req.user.username,
                  user:req.user._id,
                  items: [req.session.cart.items],
                  phone:phone,
                  address:address,
            })
            order.save().then(result=>{ 
                return res.redirect('/')
            }).catch(err=>{
                return res.redirect('/cart');
            })
        }
    }
}
module.exports =orderController;