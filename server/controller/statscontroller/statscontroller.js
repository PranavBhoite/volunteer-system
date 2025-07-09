const User = require('../../models/User');
const Event = require('../../models/EventModel');

exports.getStats = async (req, res) => {
  try {
    // Count active volunteers
    const activeVolunteerCount = await User.count({
      where: {
        isActive: true,
        type: "Volunteer"
      }
    });

    // Count all events
    const eventCount = await Event.count();

    res.status(200).json({
      success: true,
      data: {
        activeVolunteers: activeVolunteerCount,
        events: eventCount
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
};
