// DEPENDENCIES
const express = require('express');
const stage = express.Router();
const db = require('../models');
const { Stage } = db;
const { Op } = require('sequelize');

// FIND ALL STAGES
stage.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            where: {
                // Example condition, adjust as needed
                stage_name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        });
        res.status(200).json(foundStages);
    } catch (error) {
        res.status(500).json(error);
    }
});

// CREATE A STAGE
stage.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body);
        res.status(201).json(newStage);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// UPDATE A STAGE
stage.put('/:id', async (req, res) => {
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
stage.delete('/:id', async (req, res) => {
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
stage.get('/:id', async (req, res) => {
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
module.exports = stage;
