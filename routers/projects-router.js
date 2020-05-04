const express = require('express')
const db = require('../data/config');

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const projects = await db('projects')
        res.json(projects)

    } catch(err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        await db('projects').insert(req.body)
        res.status(201).json({
            message: 'new project created'
        })

    } catch(err) {
        next(err)
    }
})

router.get('/:id/tasks', async (req, res, next) => {
    try {
        const tasks = await db('tasks').where('project_id', req.params.id)
        res.json(tasks)
    } catch(err) {
        next(err)
    }
})

router.post('/:id/tasks', async (req, res, next) => {
    try {
        await db('tasks').insert(req.body)
        res.status(201).json({
            message: 'new task created'
        })

    } catch(err) {
        next(err)
    }
})

router.post('/:id/resources', async (req, res, next) => {
    try {
        await db('resources').insert(req.body)
        const resource = await db('resources').where('name', req.body.name).first()
        await db('projects_resources').insert({
            project_id: req.params.id,
            resource_id: resource.id
        })
        res.status(201).json({
            message: 'new resource created'
        })

    } catch(err) {
        next(err)
    }
})

router.get('/:id/resources', async (req, res, next) => {
    try {
        const tasks = await db('projects_resources as pr')
            .join('resources as r', 'r.id', 'pr.resource_id')
            .join('projects as p', 'p.id', 'pr.project_id')
            .where('pr.project_id', req.params.id)
            .select(
                'p.name as projectName',
                'r.id as resourceID',
                'r.name as resourceName',
                'r.description as resourceDescription'
            )
        res.json(tasks)
    } catch(err) {
        next(err)
    }
})

module.exports = router