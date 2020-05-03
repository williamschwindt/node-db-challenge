const express = require('express')
const projectsRouter = require('./routers/projects-router')
const resourcesRouter = require('./routers/resources-router')
const tasksRouter = require('./routers/tasks-router')

const server = express()
const port = process.env.PORT || 9000

server.use(express.json())
server.use('/projects', projectsRouter)
server.use('/resources', resourcesRouter)
server.use('/tasks', tasksRouter) 

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: 'something went wrong'
    })
})

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})