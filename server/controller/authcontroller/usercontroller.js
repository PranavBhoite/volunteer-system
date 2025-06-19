const User = require("../../models/User");
const eventController = require("../eventsController/eventControllers");

exports.registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    address,
    mobileNo,
    type,
  } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      name,
      email,
      password, // You can hash it if needed
      address,
      mobileNo,
      type: type || "Volunteer", // default handled by model
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    await eventController.updateEventStatuses();

    res.json({
      message: "Login successful",
      userId: user.id, // Sequelize uses 'id' (UUID)
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
