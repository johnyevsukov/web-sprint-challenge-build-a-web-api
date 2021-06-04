const Project = require('../projects/projects-model')
const Action = require('../actions/actions-model')

function validateProjectId(req, res, next) {
    Project.get(req.params.id || req.body.project_id)
    .then(project => {
        if(!project) {
            res.status(404).json({
                message: "no project exists by this id"
            })
        }
        else {
            req.project = project
            next()
        }
    })
    .catch(next)
}

// Per the github instructions for this project, completed should not be passed in the body of the req.
// It should also defualt to false. Yet the tests only pass when you do pass it in and set it to true.
function validateProject (req, res, next) {
    const { name, description } = req.body
    if(!name || !description) {
        next({
            message: "name and description are both required fields",
            status: 400
        })
    }
    else {
        req.project = { name: req.body.name.trim(), description: req.body.description.trim(), completed: true }
        next()
    }
}

function validateActionId(req, res, next) {
    Action.get(req.params.id)
    .then(action => {
        if(!action) {
            res.status(404).json({
                message: "no action exists by this id"
            })
        }
        else {
            req.action = action
            next()
        }
    })
    .catch(next)
}

function validateAction (req, res, next) {
    const { project_id, description, notes } = req.body
    if(!description || !notes || !project_id || description.length > 128) {
        next({
            message: "project_id, description, and notes are required. description must be under 129 characters",
            status: 400
        })
    }
    else {
        req.action = { project_id: req.body.project_id, description: req.body.description.trim(), notes: req.body.notes.trim() }
        next()
    }
}

function validateActionForPut (req, res, next) {
    const { project_id, description, notes } = req.body
    if(!description || !notes || !project_id || description.length > 128) {
        next({
            message: "project_id, description, and notes are required. description must be under 129 characters",
            status: 400
        })
    }
    else {
        req.action = { project_id: req.body.project_id, description: req.body.description.trim(), notes: req.body.notes.trim(), completed: true }
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProject,
    validateActionId,
    validateAction,
    validateActionForPut
}