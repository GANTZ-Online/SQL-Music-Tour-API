// DEPENDENCIES
const express = require('express');
const router = express.Router();
const db = require('../models');
const { Stage } = db;
const { Op } = require('sequelize');

// FIND ALL STAGES
router.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            order: [['stage_name', 'ASC']], // Adjust based on your model
            where: {
                // Example condition, adjust as needed
                stage_name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        });
        res.status(200).json(foundStages);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// CREATE A STAGE
router.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body);
        res.status(201).json(newStage);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// UPDATE A STAGE
router.put('/:id', async (req, res) => {
    try {
        const stage = await Stage.findByPk(req.params.id);
        if (!stage) {
            res.status(404).json({ error: 'Stage not found' });
        } else {
            await stage.update(req.body);
            res.status(200).json(stage);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE A STAGE
router.delete('/:id', async (req, res) => {
    try {
        const stage = await Stage.findByPk(req.params.id);
        if (!stage) {
            res.status(404).json({ error: 'Stage not found' });
        } else {
            await stage.destroy();
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// FIND A SPECIFIC STAGE
router.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findByPk(req.params.id);
        if (!foundStage) {
            res.status(404).json({ error: 'Stage not found' });
        } else {
            res.status(200).json(foundStage);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// EXPORT
module.exports = router;
