const mongoose = require('mongoose');

async function connectToMongo() {
    try {
        await mongoose.connect('mongodb://localhost:27017/');
        console.log("Hurrayy!!! Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongo;