const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i<300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '645547dc1ae8eab438610341',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/ddgnwky9y/image/upload/v1683651993/YelpCamp/oqrxg9eelgyahybsn4yu.avif',
                  filename: 'YelpCamp/oqrxg9eelgyahybsn4yu',
                },
                {
                  url: 'https://res.cloudinary.com/ddgnwky9y/image/upload/v1683651993/YelpCamp/dau9weijkahcdl55jeun.avif',
                  filename: 'YelpCamp/dau9weijkahcdl55jeun',
                }
              ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet. A lacus vestibulum sed arcu non odio euismod lacinia. Amet venenatis urna cursus eget nunc scelerisque viverra mauris in. Pellentesque nec nam aliquam sem. Non curabitur gravida arcu ac. Id velit ut tortor pretium viverra suspendisse potenti nullam. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Eu lobortis elementum nibh tellus molestie nunc. Malesuada fames ac turpis egestas integer eget aliquet nibh. Sit amet est placerat in egestas erat imperdiet. Auctor eu augue ut lectus arcu bibendum at varius. Praesent elementum facilisis leo vel fringilla est. Porttitor eget dolor morbi non arcu risus quis varius. Feugiat nibh sed pulvinar proin gravida hendrerit. Tortor at auctor urna nunc id cursus metus aliquam. A iaculis at erat pellentesque adipiscing commodo elit at. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Natoque penatibus et magnis dis parturient montes.',
            price: price,
            geometry: {
              coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            }
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});