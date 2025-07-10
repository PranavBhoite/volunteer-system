const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Get all pending account requests
router.get('/pending-accounts', async (req, res) => {
  try {
    // Debugging log to check database connection and query
    console.log('Fetching pending accounts...');
    const pendingAccounts = await User.findAll({
      where: { status: 'pending' },
      attributes: ['id', 'name', 'email'] // Removed 'createdAt' as it does not exist
    });
    console.log('Pending accounts fetched:', pendingAccounts);
    
    res.json(pendingAccounts);
  } catch (error) {
    console.error('Error fetching pending accounts:', error);
    res.status(500).json({ message: 'Failed to fetch pending accounts' });
  }
});

// Update account status (approve/disapprove)
router.post('/account-action', async (req, res) => {
  try {
    const { userId, action, feedback } = req.body;
    
    // Validate input
    if (!userId || !action) {
      return res.status(400).json({ message: 'User ID and action are required' });
    }
    
    // Make sure action is valid
    if (action !== 'approved' && action !== 'disapproved') {
      return res.status(400).json({ message: 'Invalid action. Must be "approved" or "disapproved"' });
    }
    
    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user status
    user.status = action;
    
    // Save feedback if provided and action is disapproved
    if (action === 'disapproved' && feedback) {
      user.feedback = feedback;
    }
    
    await user.save();
    
    res.json({ message: `Account ${action} successfully` });
  } catch (error) {
    console.error('Error updating account status:', error);
    res.status(500).json({ message: 'Failed to update account status' });
  }
});

// Get all confirmed accounts
router.get('/confirmed-accounts', async (req, res) => {
  try {
    const confirmedAccounts = await User.findAll({
      where: { status: 'approved' },
      attributes: ['id', 'name', 'email']
    });
    res.json(confirmedAccounts);
  } catch (error) {
    console.error('Error fetching confirmed accounts:', error);
    res.status(500).json({ message: 'Failed to fetch confirmed accounts' });
  }
});

// Get all declined accounts
router.get('/declined-accounts', async (req, res) => {
  try {
    const declinedAccounts = await User.findAll({
      where: { status: 'disapproved' },
      attributes: ['id', 'name', 'email', 'feedback']
    });
    res.json(declinedAccounts);
  } catch (error) {
    console.error('Error fetching declined accounts:', error);
    res.status(500).json({ message: 'Failed to fetch declined accounts' });
  }
});

module.exports = router;
