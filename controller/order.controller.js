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
            
            const order= new orderModel({
                customerName:req.user.username,
                  user:req.user._id,
                  items: [req.session.cart.items],
                  phone:phone,
                  address:address,
            })
            order.save().then(result=>{ 
                delete req.session.cart
                return res.redirect('/orders')
            }).catch(err=>{
                return res.redirect('/cart');
            })
        }
    }
}
module.exports =orderController;