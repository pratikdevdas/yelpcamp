require('dotenv').config()
const mongoose = require('mongoose')
const Campground = require('../models/campground')

const url = process.env.MONGODB_URI
mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

const seedDB = async() => {
    await Campground.deleteMany({});
    const c  = newCampground({title: 'purple field'})
    await c.save();
} 