// DEPENDENCIES
const express = require('express');
const stages = express.Router();
const db = require('../models');
const { Stage } = db;
const { Op } = require('sequelize');

// FIND ALL STAGES
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            where: {
                stage_name: { [Op.like]: `%${req.query.name ? req.query.name: ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND Stage BY ID
stages.get('/id', async (req, res) => {
    try {
        const foundStage = await Stage.findByPk(req.query.id)
        if (!foundStage) return res.status(404).json({ message: 'Stage not found' })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE NEW STAGE

stages.post('/', async (req, res) => {
    try {
        const createdStage = await Stage.create(req.body)
        res.status(201).json(
            {message: 'Successfully inserted a new band',
            data: createdStage})
    } catch (error) {
        res.status(400).json(error)
    }
})

// UPDATE STAGE BY ID
stages.put('/:id', async (req, res) =>{
    try {
        const updatedStage = await Stage.update(req.body, {
            where: { id: req.params.id }
        })
        if (!updatedStage[0]) return res.status(404).json({ message: 'Stage not found' })
        res.status(200).json({ message: 'Stage updated successfully' })
    } catch (error) {
        res.status(400).json(error)
    }
})

// DELETE STAGE BY ID

stages.delete('/:id', async (req, res) => {
    try {
        const deletedStage = await Stage.destroy({
            where: { id: req.params.id }
        })
        if (!deletedStage) return res.status(404).json({ message: 'Stage not found' })
        res.status(200).json({ message: 'Stage deleted successfully' })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = stages