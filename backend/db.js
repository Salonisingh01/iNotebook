const mongoose = require('mongoose'); // to manage database structure automatically---

async function connectToMongo() {
    try {
        await mongoose.connect('mongodb://localhost:27017/inotebook?');
        console.log("Hurrayy!!! Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongo;

//mongodb://localhost:27017 