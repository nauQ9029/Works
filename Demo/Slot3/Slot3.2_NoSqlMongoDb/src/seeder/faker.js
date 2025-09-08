const mongoose = require('mongoose');
const faker = require('faker');
const User = require('./models/User');

async function seedUsers() {
  await mongoose.connect('mongodb://localhost:27017/mydb');
  for (let i = 0; i < 100; i++) {
    const user = new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      age: faker.datatype.number({ min: 18, max: 80 })
    });
    await user.save();
  }
  console.log('100 fake users created');
  mongoose.disconnect();
}

seedUsers();