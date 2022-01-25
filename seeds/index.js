require('dotenv').config()
const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelper')
const Campground = require('../models/campground')

const url = process.env.DEV_MONGODB_URI
mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

// random place and random descriptors and and put them in a an array
const sample = array => array[Math.floor(Math.random() * array.length)];

//removes everything from database
const seedDB = async() => {
    await Campground.deleteMany({});

    for(let i=0; i<50; i++){
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 20)+10;
      const camp = new Campground({
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          image: 'https://source.unsplash.com/collection/483251',
          description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nisi mollitia magnam blanditiis dolor aliquid inventore autem, fuga doloribus corporis enim excepturi officia, pariatur ratione omnis accusantium earum perferendis est!',
          price,
          sex:"male"
      })
      await camp.save();
  }
} 

seedDB().then(() => mongoose.connection.close)