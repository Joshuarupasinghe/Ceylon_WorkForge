const express = require('express');
const Service = require('../models/Service');
const isAuthenticated = require('../middleware/auth');
const router = express.Router();

/** ----------------------------------------
 * @route   GET /api/services/summary
 * @desc    Return dashboard counts for the logged-in user
 * @access  Private
 ------------------------------------------ */
 router.get('/summary', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;

    // fetch all of this user's requests
    const myRequests = await Service.find({ 
      type: 'request', 
      createdBy: userId 
    });

    const activeProjects  = myRequests.filter(p => p.status === 'In Progress').length;
    const pendingTasks    = myRequests.filter(p => ['Planning','On Hold'].includes(p.status)).length;
    const totalBudget     = myRequests.reduce((sum, p) => sum + (p.budget||0), 0);
    const timeTracked     = myRequests.reduce((sum, p) => sum + (p.progress||0), 0); 
    // we interpret `progress` (%) as “hours” for the demo

    return res.json({
      activeProjects,
      pendingTasks,
      totalBudget,
      timeTracked
    });
  } catch (err) {
    console.error('Dashboard summary error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/** ----------------------------------------
 * @route   GET /api/services/offers
 * @desc    List all freelancer offers (type: 'offer')
 * @access  Public
 ------------------------------------------ */
router.get('/offers', async (req, res) => {
  try {
    const offers = await Service
      .find({ type: 'offer' })
      .populate('category subcategory createdBy assignedTo');
    res.status(200).json(offers);
  } catch (error) {
    console.error('Get all offers error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

/** ----------------------------------------
* @route   GET /api/services/requests
* @desc    List all client job requests (type: 'request')
* @access  Authenticated users
------------------------------------------ */
router.get(
  '/requests', isAuthenticated, async (req, res) => {
    try {
      const jobs = await Service
        .find({ type: 'request', createdBy: req.user.id })
        .populate('category subcategory createdBy assignedTo');
      res.json(jobs);
    } catch (err) {
      console.error('Get requests error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/** ----------------------------------------
* @route   GET /api/services/:id
* @desc    Get a single service (offer or request) by ID
* @access  Public
------------------------------------------ */
router.get('/:id', async (req, res) => {
  try {
    const svc = await Service
      .findById(req.params.id)
      .populate('category subcategory createdBy assignedTo');
    if (!svc) return res.status(404).json({ message: 'Service not found' });
    res.json(svc);
  } catch (err) {
    console.error('Get service error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/** ----------------------------------------
* @route   POST /api/services
* @desc    Create a new service (offer or request)
* @body    { title, description, budget, deadline?, status?, progress?, category, subcategory, image?, type }
* @access  Authenticated users
------------------------------------------ */
router.post('/', isAuthenticated, async (req, res) => {
  console.log('▶︎ POST /api/services body:', req.body);
  try {
    const svc = new Service({
      title: req.body.title,
      description: req.body.description,
      budget: req.body.budget,
      deadline: req.body.deadline,
      status: req.body.status,
      progress: req.body.progress,
      category: req.body.category,
      subcategory: req.body.subcategory,
      image: req.body.image,
      createdBy: req.user.id,
      assignedTo: req.body.assignedTo,
      type: req.body.type
    });
    await svc.save();
    const populated = await svc
    await svc.populate('category subcategory createdBy assignedTo');
    res.status(201).json(svc);
  } catch (err) {
    console.error('Create service error:', err);
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
}
);

/** ----------------------------------------
* @route   PUT /api/services/:id
* @desc    Update a service by ID
* @body    Any subset of the fields used in POST
* @access  Authenticated users (or owner/admin)
------------------------------------------ */
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const updates = { ...req.body };
    const svc = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    )
      .populate('category subcategory createdBy assignedTo');
    if (!svc) return res.status(404).json({ message: 'Service not found' });
    res.json(svc);
  } catch (err) {
    console.error('Update service error:', err);
    res.status(400).json({ message: 'Invalid update', error: err.message });
  }
}
);

/** ----------------------------------------
* @route   DELETE /api/services/:id
* @desc    Delete a service by ID
* @access  Authenticated users (or owner/admin)
------------------------------------------ */
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const svc = await Service.findByIdAndDelete(req.params.id);
    if (!svc) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Delete service error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
);

module.exports = router;

