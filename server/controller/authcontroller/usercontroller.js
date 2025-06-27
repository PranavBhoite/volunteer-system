const User = require("../../models/User");
const eventController = require("../eventsController/eventControllers");

const crypto = require('crypto');

function hashUUIDtoInt(uuid) {
  const hash = crypto.createHash('sha256').update(uuid).digest('hex');
  return parseInt(hash.substring(0, 10), 16); // Use first 10 hex digits to keep it within JS safe number range
}

function toBase62(num) {
  const base62Chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (typeof num !== 'number' || isNaN(num)) {
    console.error("Invalid input to toBase62:", num);
    return 'INVALID';
  }

  let result = '';
  do {
    result = base62Chars[num % 62] + result;
    num = Math.floor(num / 62);
  } while (num > 0);

  return result.padStart(6, '0');
}

function generateVirtualIdFromUUID(uuid) {
  const numeric = hashUUIDtoInt(uuid);
  return `TMGF${toBase62(numeric)}`;
}

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

    // Step 1: Create user WITHOUT virtualId
    const newUser = await User.create({
      name,
      email,
      password,
      address,
      mobileNo,
      type: type || "Volunteer",
      interests,
    });

    console.log(newUser.id);
    // Step 2: Generate virtualId based on database ID
    const virtualId = generateVirtualIdFromUUID(newUser.id);

    console.log(virtualId);

    // Step 3: Update the same user record with virtualId
    await newUser.update({ virtualId });

    res.status(201).json({ message: "User registered successfully" });

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
