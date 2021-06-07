// Write your "actions" router here!
const express = require('express')

const { validateActionId, validateAction, validateProjectId, validateActionForPut } = require('../middleware/middleware')

const Action = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
})

router.get('/:id', validateActionId, (req, res, next) => {
    Action.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(next)
})

router.post('/', validateProjectId, validateAction, (req, res, next) => {
    Action.insert(req.action)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, req.action)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(next)
})

// again if you dont give action to .json, the test will get angry
router.delete('/:id', validateActionId, (req, res, next) => {
    Action.remove(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(next)
})

module.exports = router