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

    const enrichedEvents = helpEvents.map(event => ({
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
      status: event.helpStatus,
      userId: {
        id: event.User?.id || null,
        name: event.User?.name || 'N/A',
        email: event.User?.email || 'N/A',
        mobileNo: event.User?.mobileNo || 'N/A'
      }
    }));

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
      category, extraVolunteers, volunteersNeeded, userIdForHelp
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
      volunteersNeeded: extraVolunteers ? volunteersNeeded : 0,
      isHelp: true,
      extraVolunteersForHelp: extraVolunteers,
      userIdForHelp: userIdForHelp,
      helpStatus: 'disapproved',
      status: 'Upcoming'
    });

    res.status(201).json({ message: 'Help event created', event: newEvent });
  } catch (err) {
    console.error('Error creating help event:', err);
    res.status(500).json({ error: 'Failed to create help event' });
  }
};

exports.updateHelpEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Fetch the event
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (!event.isHelp) {
      return res.status(400).json({ error: 'Not a help event' });
    }

    event.helpStatus = status;
    await event.save();

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
      whereClause.helpStatus = ["approved", "disapproved"];
    }

    const events = await Event.findAll({
      where: whereClause,
      include: [{
        model: User,
        attributes: ['id', 'name', 'email']
      }],
      order: [['startDate', 'ASC'], ['endDate', 'ASC']]
    });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching user help events:', error);
    res.status(500).json({ message: 'Server error while fetching user events' });
  }
};
