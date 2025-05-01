const express = require('express');
const Category = require('../models/Category');
const uploadCategory = require('../middleware/uploadCategory');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Subcategory = require('../models/Subcategory');
// const { isAdmin } = require('../middleware/auth'); // <-- your admin-check middleware

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/categories');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

/** ----------------------------------------
 * @route   GET /api/categories
 * @desc    List all categories
 ------------------------------------------ */
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
            .populate('subcategories')
            .sort('name');
        res.status(200).json(categories);
    } catch (error) {
        console.error('Get all categories error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

/** ----------------------------------------
* @route   GET /api/categories/:id
* @desc    Get one category by ID
------------------------------------------ */
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate('subcategories');
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Get one category error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

/** ----------------------------------------
 * @route   POST /api/categories
 * @desc    Create a new main category
 * @body    { name: String, subcategories: [String] }
 * @access  Admin
 ------------------------------------------ */
router.post('/', /* isAdmin, */upload.single('image'), async (req, res) => {
    try {
        console.log('🛎️ req.headers:', req.headers['content-type']);
        console.log('🛎️ req.body:', req.body);
        console.log('🛎️ req.file:', req.file && req.file.filename);
        let { name, subcategories } = req.body;
        if (typeof subcategories === 'string') {
            subcategories = JSON.parse(subcategories);
        }
        const exists = await Category.findOne({ name });
        if (exists) {
            return res.status(400).json({ message: 'Category already exists' });
        }
        const category = new Category({
            name,
            image: req.file ? `/uploads/categories/${req.file.filename}` : ''
        });
        await category.save();

        const subDocs = await Promise.all(
            subcategories.map(s =>
                Subcategory.create({ name: s, category: category._id })
            )
        );

        category.subcategories = subDocs.map(s => s._id);
        await category.save();

        await category.populate('subcategories');
        res.status(201).json(category);
    } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

/** ----------------------------------------
 * @route   PUT /api/categories/:id
 * @desc    Update a category’s name or subcategories
 * @body    { name?: String, subcategories?: [String] }
 * @access  Admin
 ------------------------------------------ */
router.put('/:id', /* isAdmin, */ uploadCategory.single('image'), async (req, res) => {
    try {
        const updates = {};
        if (req.body.name) updates.name = req.body.name;
        if (req.file) {
            updates.image = `/uploads/categories/${req.file.filename}`;
        }
        let category = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: updates }, // Use $set to update only the fields provided in the request body
            { new: true, runValidators: true } // Return the updated document
        );

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        if (req.body.subcategories) {
            let subs = req.body.subcategories;
            if (typeof subs === 'string') { subs = JSON.parse(subs); }
            await Subcategory.deleteMany({ category: category._id });

            const newSubs = await Promise.all(
                subs.map(s =>
                    Subcategory.create({ name: s, category: category._id })
                )
            );

            category.subcategories = newSubs.map(s => s._id);
            await category.save();
        }

        await category.populate('subcategories');
        res.status(200).json(category);
    } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

/** ----------------------------------------
 * @route   DELETE /api/categories/:id
 * @desc    Delete a main category
 * @access  Admin
 ------------------------------------------ */
router.delete('/:id', /* isAdmin, */async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        await Subcategory.deleteMany({ category: category._id });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

/** ----------------------------------------
* @route   POST /api/categories/:id/subcategories
* @desc    Add a sub-category to an existing category
* @body    { subcategory: String }
* @access  Admin
------------------------------------------ */
router.post('/:id/subcategories', /* isAdmin, */async (req, res) => {
    try {
        const { subcategory } = req.body;
        if (!subcategory || subcategory.trim()) {
            return res.status(400).json({ message: 'Subcategory name is required' });
        }
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        if (category.subcategories.includes(subcategory.trim())) {
            return res.status(400).json({ message: 'Subcategory already exists' });
        }
        category.subcategories.push(subcategory.trim());
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error('Add subcategory error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

/** ----------------------------------------
* @route   DELETE /api/categories/:id/subcategories/:sub
* @desc    Remove a sub-category from a category
* @access  Admin
------------------------------------------ */
router.delete('/:id/subcategories/:sub', /* isAdmin, */ async (req, res) => {
    try {
        const { id, sub } = req.params;
        const cat = await Category.findById(id);
        if (!cat) return res.status(404).json({ message: 'Category not found' });

        cat.subcategories = cat.subcategories.filter(s => s !== sub);
        await cat.save();
        res.json(cat);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;