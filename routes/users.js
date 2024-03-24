require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.URL) 
const plm = require('passport-local-mongoose');
const Schema= mongoose.Schema;
const  userSchema= new Schema({
    username: { type: "String",required:true},
    number:{ type: Number,unique: true,},
    email: { type: "String",unique: true},
    password: { type: "String"},
    order:[{
        type: mongoose.Types.ObjectId,
        ref:"Order"
    }],
    role: { type: String,default: "customer"},

},{timestamps:true})

userSchema.plugin(plm);
const User = mongoose.model('User',userSchema);

module.exports = User;


