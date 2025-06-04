const User = require('../../models/User');

exports.registerUser = async (req, res) => {
  const { name, email, password, address, mobileNo } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      address,
      mobileNo,
      status: "active", // optional, since default is already active
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// LOGIN Controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Simple password check (use bcrypt in production)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getActiveUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "active" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
exports.softDeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId, { status: "inactive" });
    res.status(200).json({ message: "User marked as inactive" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    await User.findByIdAndUpdate(userId, updatedData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};




