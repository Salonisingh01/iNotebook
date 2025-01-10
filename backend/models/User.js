const mongoose = require('mongoose'); // to manage database structure automatically---


//create schems to store user data----
const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
}
}) ;
const User = mongoose.model('user',userSchema);
module.exports = User  //create a schema  giving("modelName","schema")