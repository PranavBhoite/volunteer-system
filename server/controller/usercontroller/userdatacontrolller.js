const User = require('../../models/User');

exports.displayEvent = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Attempting to fetch user with ID:", userId); // Debug log

    // Validate if the ID is a valid MongoDB ObjectId
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Invalid ObjectId format:", userId); // Debug log
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId);
    console.log("User found:", user ? "Yes" : "No"); // Debug log
    
    if (!user) {
      console.log("User not found in database for ID:", userId); // Debug log
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Returning user data:", {
      id: user._id,
      name: user.name,
      email: user.email
    }); // Debug log (don't log sensitive data in production)
    
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    console.error("Error details:", {
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({ 
      message: "Server error while fetching user",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, address, mobileNo } = req.body;
    
    console.log("Attempting to update user:", userId); // Debug log
    console.log("Update data:", { name, address, mobileNo }); // Debug log

    // Validate if the ID is a valid MongoDB ObjectId
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Invalid ObjectId format for update:", userId); // Debug log
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Validate required fields
    if (!name || !address || !mobileNo) {
      return res.status(400).json({ 
        message: "Name, address, and mobile number are required" 
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, address, mobileNo },
      { new: true, runValidators: true }
    );

    console.log("Update result:", updatedUser ? "Success" : "User not found"); // Debug log

    if (!updatedUser) {
      console.log("User not found for update, ID:", userId); // Debug log
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ 
      message: "User updated successfully", 
      user: updatedUser 
    });
  } catch (err) {
    console.error("Error updating user:", err);
    console.error("Error details:", {
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({ 
      message: "Update failed",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};