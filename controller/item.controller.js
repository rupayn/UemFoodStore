const menuModel =require('../routes/menu')

function itemController(){
    return {
        async mitem(req, res){
  
            const menus = await menuModel.find()
            res.render('items',{menus});
          
            res.render('items');
        },
        mcart(req,res){
            res.render('customer/cart');
        },
        mcontact(req,res){
            res.render('customer/contactUs');

        }
    }
}

module.exports=itemController