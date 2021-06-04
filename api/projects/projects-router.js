// Write your "projects" router here!
const express = require('express')

const { validateProjectId, validateProject } = require('../middleware/middleware')

const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.project)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, req.project)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(next)
})

// Per the instructions, the delete route should return nothing, but the tests only
// pass if you put delted in res.json
router.delete('/:id', validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
    .then(deleted => {
        res.status(200).json(deleted)
    })
    .catch(next)
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
})

module.exports = router