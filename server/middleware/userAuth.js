const User = require('../models/User');
const Event = require('../models/EventModel');

// Middleware to check if user is approved for write operations
exports.checkUserApproval = async (req, res, next) => {
  try {
    // extract user ID from request body or params
    let userId = req.body.userId || req.body.userIdForHelp || req.params.userId || req.params.id;
    
    // for cancel operations, we need to check the event owner
    if (!userId && req.params.id && req.route.path.includes('cancel')) {
      const event = await Event.findByPk(req.params.id);
      if (event && event.isHelp) {
        userId = event.userIdForHelp;
      } else {
        // For admin-created events, we might not have a specific user to check
        // In this case, we'll allow the operation to proceed
        return next();
      }
    }
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === 'pending') {
      return res.status(403).json({ 
        message: "Action not allowed. Your account is pending approval and you have read-only access.",
        userStatus: user.status 
      });
    }

    if (user.status === 'disapproved') {
      return res.status(403).json({ 
        message: "Action not allowed. Your account has been disapproved.",
        userStatus: user.status 
      });
    }

    // User is approved, continue with the operation
    next();
  } catch (error) {
    console.error('Error checking user approval:', error);
    res.status(500).json({ message: "Server error during authorization check" });
  }
};
