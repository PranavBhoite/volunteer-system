const Admin = require("../../models/Admin");
const eventController = require("../eventsController/eventControllers");

exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existing = await Admin.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });

    // Create and save new admin
    const newAdmin = await Admin.create({ email, password });

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Error registering admin:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ where: { email } });

    // Validate password
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    await eventController.updateEventStatuses();

    res.json({ message: 'Login successful', uid: admin.id });
  } catch (err) {
    console.error('Error logging in admin:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
