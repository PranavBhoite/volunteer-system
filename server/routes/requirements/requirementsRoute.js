const express = require('express');
const router = express.Router();
const {
  createRequirement,
  getAllRequirements,
  updateRequirement,
  logRequirementClick,
  getRequirementAnalytics,
  deleteRequirement,
} = require('../../controller/requirementsController/requirementsController');

// Admin routes - for now just check if adminId is provided
router.post('/', createRequirement);
router.put('/:id', updateRequirement);
router.delete('/:id', deleteRequirement);
router.get('/:id/analytics', getRequirementAnalytics);

// Public/Volunteer routes
router.get('/', getAllRequirements);
router.post('/:requirementId/click', logRequirementClick);

module.exports = router;
