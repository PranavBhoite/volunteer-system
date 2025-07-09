const {User, Event, EventUserMap} = require('../../models');
const { Op } = require('sequelize');


exports.getAllHelpEvents = async (req, res) => {
  try {
    const helpEvents = await Event.findAll({
      where: {
        isHelp: true
      },
      include: [{
        model: User,
        attributes: ['id', 'name', 'email', 'mobileNo']
      }],
      order: [
        ['startDate', 'ASC'],
        ['endDate', 'ASC']
      ]
    });

    const enrichedEvents = helpEvents.map(event => {
      const feedbacks = event.helpFeedback || [];
      let feedback = null;

      if (feedbacks.length > 0) {
        feedback = feedbacks.reduce((latest, current) => {
          return new Date(current.timeStamp) > new Date(latest.timeStamp) ? current : latest;
        });
      }

      return {
        id: event.id,
        title: event.title,
        startDate: event.startDate, 
        endDate: event.endDate,
        startTime: event.startTime,
        endTime: event.endTime,
        place: event.location,
        description: event.description,
        location: event.location,
        category: event.category,
        volunteersNeeded: event.volunteersNeeded,
        extraVolunteers: event.extraVolunteersForHelp,
        status: event.status,
        helpStatus : event.helpStatus,
        helpFeedback : !feedback ? '' : feedback.message, 
        userId: {
          id: event.User?.id || null,
          name: event.User?.name || 'N/A',
          email: event.User?.email || 'N/A',
          mobileNo: event.User?.mobileNo || 'N/A'
        }
      };
    });

    res.status(200).json(enrichedEvents);
  } catch (err) {
    console.error('Error fetching help events:', err);
    res.status(500).json({ error: 'Failed to fetch help events' });
  }
};


exports.createHelpEvent = async (req, res) => {
  try {
    const {
      title, description, startDate, endDate,
      startTime, endTime, location,
      category, extraVolunteersForHelp, volunteersNeeded, userIdForHelp
    } = req.body;

    const newEvent = await Event.create({
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      category,
      volunteersNeeded,
      extraVolunteersForHelp,
      userIdForHelp,
      isHelp: true,
      helpFeedback: [],
      helpStatus: 'pending',
      status: 'Upcoming'
    });

    res.status(201).json({ message: 'Help event created', event: newEvent });
  } catch (err) {
    console.error('Error creating help event:', err);
    res.status(500).json({ error: 'Failed to create help event' });
  }
};

exports.updateEventFromUserSide = async (req, res) => {
  try {
    const id = req.params.id;

    console.log(`Event id : ${id}`);

    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (!event.isHelp) return res.status(400).json({ error: 'Not a user initiated event' });

    event.set({
      ...req.body,
      helpFeedback: event.helpFeedback,  // preserve old feedback
      isHelp: true,
      helpStatus: 'pending',
      status: 'Upcoming',
    });

    await event.save();

    res.status(200).json({ message: 'Help event updated', event });
  } catch (err) {
    console.error('Error Updating help event:', err);
    res.status(500).json({ error: 'Failed to update help event' });
  }
};

exports.updateHelpEventStatusFromAdminSide = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, message } = req.body;

    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (!event.isHelp) return res.status(400).json({ error: 'Not a user initiated event' });

    const newFeedback = {
      timeStamp: new Date().toISOString(),
      message: message,
    };

    // Make a fresh array to ensure Sequelize tracks the change
    const updatedFeedback = [...(event.helpFeedback || []), newFeedback];

    event.helpFeedback = updatedFeedback;
    event.helpStatus = status;

    await event.save();

    // only if the admin is approving an event add an entry in event user map
    if(status === "approved"){
       //create entry in event user map
      const entry = await EventUserMap.create({
        userId: event.userIdForHelp,
        eventId: id,
        isAttended: false,
      });

      console.log(entry); 
    }

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (err) {
    console.error('Error updating help event status:', err);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

exports.getUserHelpEvents = async (req, res) => {
  const { id, status } = req.params;
  console.log(`Id : ${id} Status : ${status}`);

  try {
    const whereClause = {
      isHelp: true,
      userIdForHelp: id
    };

    if (status && status !== "all") {
      whereClause.helpStatus = status;
    } else {
      whereClause.helpStatus = ["pending", "approved", "disapproved"];
    }

    const events = await Event.findAll({
      where: whereClause,
      include: [{
        model: User,
        attributes: ['id', 'name', 'email']
      }],
      order: [['startDate', 'ASC'], ['endDate', 'ASC']]
    });

    // Attach only the latest feedback
    const enrichedEvents = events.map(event => {
      const feedbacks = event.helpFeedback || [];
      let feedback = null;

      if (feedbacks.length > 0) {
        feedback = feedbacks.reduce((latest, current) => {
          return new Date(current.timeStamp) > new Date(latest.timeStamp) ? current : latest;
        });
      }

      return {
        ...event.toJSON(),
        helpFeedback : !feedback ? "" : feedback.message,
      };
    });

    res.status(200).json(enrichedEvents);
  } catch (error) {
    console.error('Error fetching user help events:', error);
    res.status(500).json({ message: 'Server error while fetching user events' });
  }
};