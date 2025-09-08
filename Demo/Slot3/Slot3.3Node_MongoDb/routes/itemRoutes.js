const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET: Lấy danh sách items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// POST: Thêm item mới
router.post('/', async (req, res, next) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json({ message: 'Item created successfully', item: newItem });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
               
    }
});

// PUT: Cập nhật item theo ID
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
});

// DELETE: Xóa item theo ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
