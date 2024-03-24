const mongoose = require('mongoose')
const Schema= mongoose.Schema;
const  menuSchema= new Schema({
    image: { type: String,required: true},
    name: { type: String,required: true},
    price: { type: Number,required: true},

})

const connection = mongoose.connection;
connection.on('error', (err) => {
    console.error(`Failed to connect DB: ${err}`);
});

connection.once('open', () => {
    console.log(`Db connection established...`);
});
const Menu = mongoose.model('menu',menuSchema);
module.exports = Menu;