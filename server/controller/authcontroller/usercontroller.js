const User = require("../../models/User");
const eventController = require("../eventsController/eventControllers");

// Function to generate meaningful virtual ID
async function generateMeaningfulVirtualId() {
  // Get current year's last two digits
  const currentYear = new Date().getFullYear();
  const yearSuffix = currentYear.toString().slice(-2);
  
  // Get the count of existing users to determine the next increment
  const userCount = await User.count();
  const nextIncrement = userCount + 1;
  
  // Format the increment as 5-digit number with leading zeros
  const incrementStr = nextIncrement.toString().padStart(5, '0');
  
  // Combine to create virtual ID
  const virtualId = `TMGF${yearSuffix}${incrementStr}`;
  
  return virtualId;
}

// Updated registration controller
exports.registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    address,
    mobileNo,
    type,
    interests,
  } = req.body;

  if (!name || !email || !password || !address || !mobileNo || !interests) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Generate meaningful virtual ID
    const virtualId = await generateMeaningfulVirtualId();

    // Create user with virtualId
    const newUser = await User.create({
      name,
      email,
      password,
      address,
      mobileNo,
      type: type || "Volunteer",
      interests,
      virtualId, // Include virtualId during creation
    });

    console.log('New user created with ID:', newUser.id);
    console.log('Virtual ID:', virtualId);

    res.status(201).json({ 
      message: "User registered successfully",
      virtualId: virtualId
    });

  } catch (error) {
    console.error("Error in registerUser:", error);
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(e => e.message);
      return res.status(400).json({ message: "Validation failed", errors: messages });
    }
    res.status(500).json({ message: "Registration failed due to a server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt with email:", email);
  console.log("Login attempt with password:", password);

  try {
    const user = await User.findOne({ where: { email } });

    console.log("User fetched from database:", user);

    if (!user || user.password !== password) {
      // console.log("Invalid credentials for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the user's account is disapproved
    if (user.status === 'disapproved') {
      // console.log("Login attempt for disapproved account:", email);
      return res.status(400).json({
        message: "Your account has been disapproved",
        feedback: user.feedback || "No feedback provided",
      });
    }

    // Check if the user's account is pending
    if (user.status === 'pending') {
      // console.log("Login attempt for pending account:", email); this is just for debugging purpose
      return res.status(400).json({
        message: "Your account is still pending confirmation. Please wait for admin approval."
      });
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
