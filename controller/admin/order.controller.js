// const Order=require("../../routes/order")
// function adminOrderController (){
//     return {
//          index(req,res){
//             Order.find({ status :{$ne:'completed'}},null,{sort:{ 'createdAt':-1 }}).populate('user','-password').exec((err,orders)=>{
//                 if(req.xhr){
//                     return res.json(orders)
//                 }
//                  return res.render('admin/orders')
//             })
//          }
//     }
// }
// module.exports = adminOrderController;


// const Order = require("../../routes/order"); // Assuming correct path to Order model

// function adminOrderController() {
//     return {
//         async index(req, res) {
//             try {
//                 const orders = await Order.find({ status: { $ne: 'completed' } })
//                     .sort({ 'createdAt': -1 })
//                     .populate('user', '-password')
//                     .exec();

//                 // if (req.xhr) {
//                 //     return res.json(orders);
//                 // }
//                 let uname=req.globalSession
//                 return res.render('admin/orders', { orders,user:uname});
//             } catch (error) {
//                 console.error(error);
//                 return res.status(500).json({ error: 'Internal server error' });
//             }
//         }
//     };
// }

// module.exports = adminOrderController;
