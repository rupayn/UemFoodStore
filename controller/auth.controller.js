const userModel =require('../routes/users');
const passport=require('passport')

function authController(){
    return{
        signup(req,res){
            res.render('auth/signup',{ layout: false });
        },
        postsignup(req,res){
            const userData = new userModel({
                username: req.body.username,
                number: req.body.number,
                email: req.body.email,
              });
            
              userModel.register(userData, req.body.password).then(function (registereduser) {
                passport.authenticate("local")(req, res, function () {
                  res.redirect("/");
                });
              });
        },
        login(req, res){
            

            res.render('auth/login',{ layout: false });

        },
        
        logout(req,res){
            req.logout(function(err){
                if (err){return next(err)}
                res.redirect("/");
              })
        }
    }
}

module.exports=authController