const Order=require("../../routes/order")
function adminOrderController (){
    return {
         index(req,res){
            Order.find({ status :{$ne:'completed'}},null,{sort:{ 'createdAt':-1 }}).populate('user','-password').exec((err,orders)=>{
                if(req.xhr){
                    return res.json(orders)
                }
                 return res.render('admin/orders')
            })
         }
    }
}
module.exports = adminOrderController;