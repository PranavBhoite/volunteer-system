const User = require('../../models/User');

exports.displayUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Attempting to fetch user with ID:", userId);

    const user = await User.findByPk(userId); // Sequelize primary key lookup

    if (!user) {
      console.log("User not found in database for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // You can exclude sensitive data if needed
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({
      message: "Server error while fetching user",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, address, mobileNo, type } = req.body;

    if (!name || !address || !mobileNo || !email ) {
      return res.status(400).json({
        message: "Name, address, and mobile number are required"
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      console.log("User not found for update, ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.address = address;
    user.mobileNo = mobileNo;
    user.email = email;
    user.type = type;
    await user.save();

    res.json({
      message: "User updated successfully",
      user
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({
      message: "Update failed",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};