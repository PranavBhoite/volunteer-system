const HelpEvent = require('../../models/Help');
const User = require('../../models/User');


exports.getAllHelpEvents = async (req, res) => {
  try {
    const helpEvents = await HelpEvent.find();

    // Map over help events to manually include user details
    const enrichedEvents = await Promise.all(helpEvents.map(async (event) => {
      const user = await User.findById(event.userId).select('name email mobileNo');
      
      return {
        _id: event._id,
        title: event.title,
        date: event.date,
        time: event.time,
        place: event.place,
        extraVolunteers: event.extraVolunteers,
        status: event.status,
        userId: {
          _id: user?._id || null,
          name: user?.name || 'N/A',
          email: user?.email || 'N/A',
          mobileNo: user?.mobileNo || 'N/A',
        },
      };
    }));

    res.status(200).json(enrichedEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch help events' });
  }
};

exports.createHelpEvent = async (req, res) => {
  try {
    const { title, date, time, place, extraVolunteers, userId } = req.body;
    const newEvent = new HelpEvent({
      title, date, time, place, extraVolunteers, userId,
      status: 'disapproved'
    });
    await newEvent.save();
    res.status(201).json({ message: 'Help event created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create help event' });
  }
};

exports.updateHelpEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await HelpEvent.findByIdAndUpdate(id, { status });
    res.status(200).json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

exports.getUserHelpEvents = async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;

  try {
    const query = { userId: id };
    if (status) {
      query.status = status;
    }

    const events = await HelpEvent.find(query).populate('userId', 'name email');
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching user events:', error);
    res.status(500).json({ message: 'Server error while fetching user events' });
  }
};
