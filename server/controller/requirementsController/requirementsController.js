const { Requirement, RequirementClick, Admin, User } = require('../../models');

// create a new requirement (admin only)
const createRequirement = async (req, res) => {
  try {
    const { itemName, quantity, description, productLink, priority, adminId } = req.body;
    const createdBy = req.headers['admin-id'] || adminId; 

    if (!itemName || !quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item name and quantity are required' 
      });
    }

    if (!createdBy) {
      return res.status(401).json({ 
        success: false, 
        message: 'Admin authentication required' 
      });
    }

    const requirement = await Requirement.create({
      itemName,
      quantity,
      description,
      productLink,
      priority: priority || 'medium',
      remainingQuantity: quantity,
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: 'Requirement created successfully',
      data: requirement,
    });
  } catch (error) {
    console.error('Error creating requirement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create requirement',
      error: error.message,
    });
  }
};

// Get all active requirements
const getAllRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.findAll({
      where: {
        status: 'active'
      },
      include: [
        {
          model: Admin,
          attributes: ['id', 'email'],
          as: 'admin' 
        }
      ],
      order: [['priority', 'DESC'], ['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: requirements,
      message: 'Requirements fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching requirements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch requirements',
      error: error.message,
    });
  }
};


const updateRequirement = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remainingQuantity, priority } = req.body;

    const requirement = await Requirement.findByPk(id);
    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: 'Requirement not found',
      });
    }

    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (remainingQuantity !== undefined) updateData.remainingQuantity = remainingQuantity;
    if (priority !== undefined) updateData.priority = priority;

    await requirement.update(updateData);

    res.status(200).json({
      success: true,
      message: 'Requirement updated successfully',
      data: requirement,
    });
  } catch (error) {
    console.error('Error updating requirement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update requirement',
      error: error.message,
    });
  }
};

const logRequirementClick = async (req, res) => {
  try {
    const { requirementId } = req.params;
    const { intendedQuantity, userId } = req.body;
    const clickUserId = req.headers['user-id'] || userId; 

    const requirement = await Requirement.findByPk(requirementId);
    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: 'Requirement not found',
      });
    }

    // if userId is provided, log the click for analytics
    if (clickUserId) {
      const click = await RequirementClick.create({
        requirementId,
        userId: clickUserId,
        intendedQuantity,
      });

      res.status(201).json({
        success: true,
        message: 'Click logged successfully',
        data: click,
      });
    } else {
      // still allow the click to be processed even without user ID
      res.status(200).json({
        success: true,
        message: 'Click processed (not logged)',
      });
    }
  } catch (error) {
    console.error('Error logging requirement click:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to log click',
      error: error.message,
    });
  }
};

// get requirement analytics (admin only)
const getRequirementAnalytics = async (req, res) => {
  try {
    const { id } = req.params;

    const requirement = await Requirement.findByPk(id, {
      include: [
        {
          model: RequirementClick,
          include: [
            {
              model: User,
              attributes: ['name', 'email'],
            },
          ],
        },
      ],
    });

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: 'Requirement not found',
      });
    }

    const analytics = {
      requirement,
      totalClicks: requirement.RequirementClicks.length,
      uniqueVolunteers: new Set(requirement.RequirementClicks.map(click => click.userId)).size,
      recentClicks: requirement.RequirementClicks.slice(-10),
    };

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error('Error fetching requirement analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message,
    });
  }
};

// delete requirement (admin only)
const deleteRequirement = async (req, res) => {
  try {
    const { id } = req.params;

    const requirement = await Requirement.findByPk(id);
    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: 'Requirement not found',
      });
    }

    await requirement.destroy();

    res.status(200).json({
      success: true,
      message: 'Requirement deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting requirement:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete requirement',
      error: error.message,
    });
  }
};

module.exports = {
  createRequirement,
  getAllRequirements,
  updateRequirement,
  logRequirementClick,
  getRequirementAnalytics,
  deleteRequirement,
};
