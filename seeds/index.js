const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
 
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60c39b98da51e648fdd51b87',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam vel et explicabo doloremque, debitis inventore numquam quidem incidunt qui corrupti, ratione, autem repellat minima in earum deleniti eaque ipsa magni corporis id odio blanditiis quam dignissimos. Sit sunt iste hic, soluta dolorum autem, facere sapiente perferendis facilis sint dolor similique!',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/karnes232/image/upload/v1623512482/YelpCamp/q0nd6buxk4xzntw92oqg.jpg',
                    filename: 'YelpCamp/q0nd6buxk4xzntw92oqg'
                  },
                  {
                    url: 'https://res.cloudinary.com/karnes232/image/upload/v1623512482/YelpCamp/dfhgtd7ytludir9b7pt8.png',
                    filename: 'YelpCamp/dfhgtd7ytludir9b7pt8'
                  }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});