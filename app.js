require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')
const campground = require('./models/campground')

const url = process.env. MONGODB_URI
mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.send("Hello from yelpcamp")
})

app.get('/campgrounds', async(req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds})
})

app.get('/campgrounds/:id', async(req,res)=>{
    res.render('campgrounds/show')
})

app.listen(3000,()=>{
    console.log('serving on port 3000')
})
