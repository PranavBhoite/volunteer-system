const { EventUserMap } = require('../../models');
const Event = require('../../models/EventModel');
const User = require('../../models/User');

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      volunteersNeeded,
      category,
    } = req.body;

    // Provide default values or extract from session/context
    const event = await Event.create({
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      volunteersNeeded,
      category,
      userIdForHelp: null,
      isHelp: false,
      extraVolunteersForHelp: false,
      helpStatus: "disapproved",
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const [updated] = await Event.update(req.body, {
      where: { id: eventId }
    });

    if (updated) {
      const updatedEvent = await Event.findByPk(eventId);
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();

    const filteredEvents = events.filter(event =>
      !event.isHelp || (event.extraVolunteersForHelp && event.helpStatus === "approved")
    );

    res.status(200).json(filteredEvents);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
};


// this function gives events list as output for a userid and type as upcoming, ongoing, registered or completed
exports.getUserSpecificEvents = async (req, res) => {
  try {
    const userId = req.params.id;
    const eventType = req.params.event;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    let eventsToReturn = [];

    if (eventType === "Upcoming") {
      const allEvents = await Event.findAll({ where: { status: "Upcoming" } }); // get all the events where status is upcoming

      const userEventMappings = await EventUserMap.findAll({
        where: {
          userId: userId,
          isAttended: false,
        }
      }); // get all the events registered by user

      const userEventIds = userEventMappings.map(e => e.eventId); // get only those events which are not registered by user

      eventsToReturn = allEvents.filter(event =>
        !userEventIds.includes(event.id) &&
        event.status === "Upcoming" && (!event.isHelp || event.helpStatus === "approved") //filter only admin created events and only those user created events which are approved and need extra volunteers
      );

    } else if (eventType === "Ongoing") {
      const ongoingEvents = await Event.findAll({ where: { status: "Ongoing" } }); //get all ongoing events

      eventsToReturn = ongoingEvents.filter(event =>
        event.status === "Ongoing" && (!event.isHelp || event.helpStatus === "approved") //filter only admin created events and only those user created events which are approved and need extra volunteers
      );

    } else {
      const userEventMappings = await EventUserMap.findAll({
        where: {
          userId: userId,
          isAttended : false,
        },
        include: [Event]
      });

      eventsToReturn = userEventMappings
        .map(mapping => mapping.Event)
        .filter(event =>
          (eventType === "Registered") ? 
            event.status === "Upcoming" && (!event.isHelp || event.helpStatus === "approved") //Filter for registered events and get admin created events and only those user created completed evnets which are approved by admin 
          : 
            event.status === "Completed" && (!event.isHelp || event.helpStatus === "approved") // filter to get all admin created completed events and only those user created completed evnets which are approved by admin 
        );
    }

    res.json(eventsToReturn);
  } catch (error) {
    console.error('Error fetching user specific events:', error);
    res.status(500).json({ message: "Error Fetching events", error: error.message });
  }
};


//to register for an event
exports.registerEvent = async (req, res) => {
  try {
    const userid = req.body.userId;
    const eventid = req.body.eventId;

    console.log(`userid ${userid} event id ${eventid}`);

    const event = await Event.findByPk(eventid);

    //check if user already registered
    if(!event) {
      return res.status(404).json({ message: "Event not found to register" });
    }
    if(event.volunteersNeeded <= 0) {
      return res.status(404).json({ message: "Event is full, Not able to Register" });
    }

    //create entry in event user map
    const entry = await EventUserMap.create({
      userId: userid,
      eventId: eventid,
      isAttended: false,
    });

    console.log(entry);

    //decrement the vounteers needed count in events table
    if (event) {
      await event.decrement('volunteersNeeded', { by: 1 });
    }    

    console.log('Event volunteers and count updated successfully.');
    res.status(200).json({ message: "Event Registered Successfully" }); 
  } catch (error) {
    console.error('Error during registerEvent:', error); 
    res.status(500).json({ message: "Error Registering for event: " + error.message });
  }
};

//to un register and event
exports.unRegisterEvent = async (req, res) => {
  try {
    const userid = req.body.userId;
    const eventid = req.body.eventId;

    const event = await Event.findByPk(eventid);
    if (!event) {
      return res.status(404).json({ message: "Event not found to unregister" });
    }

    // Check if mapping exists
    const entry = await EventUserMap.findOne({
      where: {
        userId: userid,
        eventId: eventid,
      },
    });

    if (!entry) {
      return res.status(404).json({ message: "You are not registered for this event" });
    }

    // Delete the entry
    await entry.destroy();

    // Increment volunteer count
    await event.increment('volunteersNeeded', { by: 1 });

    console.log('User unregistered and volunteer count updated successfully.');
    res.status(200).json({ message: "Event unregistered successfully" });

  } catch (error) {
    console.error('Error during unregisterEvent:', error); 
    res.status(500).json({ message: "Error unregistering from event: " + error.message });
  }
};

// to cancel an event
exports.cancelEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update the status to 'Cancelled'
    event.status = "Cancelled";
    await event.save();

    // Delete all mappings for this event from EventUserMap
    await EventUserMap.destroy({
      where: {
        eventId: eventId
      }
    });

    res.status(200).json({ message: "Event cancelled successfully", event });
  } catch (error) {
    console.error("Error cancelling event:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// this function is like a scheduler function which will run every time some one logs in to check and update all the statuses of events  
exports.updateEventStatuses = async () => {
  try {
    const currentDateTime = new Date(); // Current timestamp

    const events = await Event.findAll();

    for (const event of events) {
      // Combine date and time to form full timestamps
      const startTimestamp = new Date(`${event.startDate}T${event.startTime}`);
      const endTimestamp = new Date(`${event.endDate}T${event.endTime}`);
      let newStatus = event.status;

      if (event.status === "Cancelled") {
        newStatus = "Cancelled"; // Don't change if manually cancelled
      } else if (currentDateTime < startTimestamp) {
        newStatus = "Upcoming";
      } else if (currentDateTime >= startTimestamp && currentDateTime <= endTimestamp) {
        newStatus = "Ongoing";
      } else if (currentDateTime > endTimestamp) {
        newStatus = "Completed";
      }

      // Update status only if it has changed
      if (event.status !== newStatus) {
        await Event.update(
          { status: newStatus },
          { where: { id: event.id } }
        );
      }
    }

    console.log("Event statuses updated with time accuracy.");
  } catch (error) {
    console.error("Error updating event statuses:", error);
  }
};


exports.getEventsForHome = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [['createdAt', 'DESC']],
    });

    const newEvents = events.filter(event => {
      if (event.isHelp) {
        return event.helpStatus === "approved";
      }
      return true;
    });

    res.status(200).json(newEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};