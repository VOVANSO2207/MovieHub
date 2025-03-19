const { getAllUsers } = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
};

module.exports = { getUsers };