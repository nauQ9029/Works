// controllers/userController.js
const User = require('../models/user');

const userController = {
  findUserByUsername: async (username) => {
    try {
      return await User.findOne({ username });
    } catch (error) {
      throw new Error('Lỗi khi tìm người dùng: ' + error.message);
    }
  },

  createUser: async (username, hashedPassword) => {
    try {
      const newUser = new User({ username, password: hashedPassword });
      return await newUser.save();
    } catch (error) {
      throw new Error('Lỗi khi tạo người dùng: ' + error.message);
    }
  }
};

module.exports = userController;
