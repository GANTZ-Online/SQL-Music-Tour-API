// DEPENDENCIES
const express = require('express');
const event = express.Router();
const db = require('../models');
const { Event } = db;
const { Op } = require('sequelize');

// FIND ALL EVENTS BY NAME
event.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        });
        res.status(200).json(foundEvents);
    } catch (error) {
        console.error('Error while fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// FIND AN EVENT BY NAME
event.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: {
                name: req.params.name
            }
        });
        if (!foundEvent) {
            res.status(404).json({ error: 'Event not found' });
        } else {
            res.status(200).json(foundEvent);
        }
    } catch (error) {
        console.error('Error while fetching event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// CREATE AN EVENT
event.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error while creating event:', error);
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
        console.error('Error while updating event:', error);
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
        console.error('Error while deleting event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// EXPORT
module.exports = event;
