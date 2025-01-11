const mongoose = require('mongoose'); // to manage database structure automatically---


//create schems to store user data----
const NotesSchema = new mongoose.Schema({
    user:{
      
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
tag:{
    type:String,
    default:"General"
},
date:{
    type:Date,
    default:Date.now
}
}) ;
module.exports = mongoose.model('Notes',NotesSchema);//create a schema  giving("modelName","schema")