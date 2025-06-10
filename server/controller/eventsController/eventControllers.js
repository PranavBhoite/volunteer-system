const Event = require('../../models/EventModel');
const User = require('../../models/User');

exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const eventid = req.params.id;
    await Event.findByIdAndUpdate(
      eventid, 
      req.body,
      {new : true}
    ).then(event => { 
      res.status(201).json(event);
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ message: "Error fetching users" });
    }
};

exports.getUserSpecificEvents = async (req, res) => {
  try {
    const userId = req.params.id;
    const eventType = req.params.event; // "Upcoming", "Registered", "Completed"

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    let eventsToReturn = [];

    if (eventType === "Upcoming") {
      const allEvents = await Event.find();

      // Ensure arrays are not null/undefined before concatenating
      const registeredOrCompletedEvents = new Set(
        (user.completedEvents || []).map(id => id.toString()) // Convert Mongoose ObjectIds to strings
        .concat((user.registeredEvents || []).map(id => id.toString()))
      );

      const now = new Date();

      eventsToReturn = allEvents.filter(event => {
        
        const isNotRegisteredOrCompleted = !registeredOrCompletedEvents.has(event._id.toString());

        const eventDateTimeString = `${event.date}T${event.time}:00`;
        const eventDateTime = new Date(eventDateTimeString);

        const isFutureEvent = eventDateTime.getTime() > now.getTime();

        return isNotRegisteredOrCompleted && isFutureEvent;
      });

    } else {
      // Determine which list of event IDs to use based on type
      let eventList = [];
      if (eventType === "Completed") {
        eventList = user.completedEvents || [];
      } else if (eventType === "Registered") {
        eventList = user.registeredEvents || [];
      } else {
        return res.status(400).json({ message: 'Invalid event type provided.' });
      }

      if (eventList.length === 0) {
        eventsToReturn = [];
      }else {
        // Fetch the actual event documents using Promise.all for efficiency
      // Map each ID to a findById promise, then await all of them
      const eventPromises = eventList.map(id => Event.findById(id));
      eventsToReturn = await Promise.all(eventPromises);
      }
      
      eventsToReturn = eventsToReturn.filter(event => event !== null);
    }

    res.json(eventsToReturn);

  } catch (error) {
    console.error('Error fetching user specific events:', error); 
    res.status(500).json({ message: "Error Fetching events", error: error.message }); 
  }
};

exports.registerEvent = async (req, res) => {
  try {
    const userid = req.body.userId;
    const eventid = req.body.eventId;

    // 1. Push user from registeredEvents on the User document
    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { $addToSet: { registeredEvents: eventid } },
      { new: true } 
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log('User Document Updated Successfully:', updatedUser);

    // 2. Push user from volunteers array on the Event document and then update the count
    const eventAfterVolunteerAdd = await Event.findByIdAndUpdate(
      eventid,
      { $addToSet: { volunteers: userid } }, 
      { new: true } // Return the updated event document
    );

    if (!eventAfterVolunteerAdd) {
      // If event not found after the first update, undo user registration
      await User.findByIdAndUpdate(userid, { $pull: { registeredEvents: eventid } });
      return res.status(404).json({ message: "Event not found for registration." });
    }

    // update the volunteersRegistered count based on the actual array length
    await Event.findByIdAndUpdate(
      eventid,
      { volunteersRegistered: eventAfterVolunteerAdd.volunteers.length },
      { new: true } 
    );

    console.log('Event volunteers and count updated successfully.');
    res.status(200).json({ message: "Event Registered Successfully" });

  } catch (error) {
    console.error('Error during registerEvent:', error); 
    res.status(500).json({ message: "Error Registering for event: " + error.message });
  }
};

exports.unRegisterEvent = async (req, res) => {
  try {
    const userid = req.body.userId;
    const eventid = req.body.eventId;

    // 1. Pull user from registeredEvents on the User document
    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { $pull: { registeredEvents: eventid } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log('User Document Updated Successfully (Unregister):', updatedUser);

    // 2. Pull user from volunteers array on the Event document and then update the count
    const eventAfterVolunteerPull = await Event.findByIdAndUpdate(
      eventid,
      { $pull: { volunteers: userid } }, 
      { new: true }
    );

    if (!eventAfterVolunteerPull) {
      return res.status(404).json({ message: "Event not found for unregistration." });
    }

    // update the volunteersRegistered count based on the actual array length
    await Event.findByIdAndUpdate(
      eventid,
      { volunteersRegistered: eventAfterVolunteerPull.volunteers.length },
      { new: true } 
    );

    console.log('Event volunteers and count updated successfully (Unregister).');
    res.status(200).json({ message: "Event Unregistered Successfully" }); 

  } catch (error) {
    console.error('Error during unRegisterEvent:', error); // Log the actual error
    res.status(500).json({ message: "Error Unregistering for event: " + error.message }); // Changed message
  }
};

exports.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
};
