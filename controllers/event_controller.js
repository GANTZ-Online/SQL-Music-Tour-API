// DEPENDENCIES
const express = require('express');
const event = express.Router();
const db = require('../models');
const { Event } = db;
const { Op } = require('sequelize');

// FIND ALL EVENTS
event.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [['start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        });
        res.status(200).json(foundEvents);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// FIND A SPECIFIC EVENT
event.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.all(req.params.id);
        if (!foundEvent) {
            res.status(404).json({ error: 'Event not found' });
        } else {
            res.status(200).json(foundEvent);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// CREATE AN EVENT
event.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// UPDATE AN EVENT
event.put('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            res.status(404).json({ error: 'Event not found' });
        } else {
            await event.update(req.body);
            res.status(200).json(event);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE AN EVENT
event.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            res.status(404).json({ error: 'Event not found' });
        } else {
            await event.destroy();
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// EXPORT
module.exports = router;
