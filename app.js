const express = require('express')
const app = express()
const server = require('http').Server(app)
const port = 5000

const {
    getAllModels, getModelsByHighestScore, getModelsByTopHighestScore,
    getModelByModelName, getModelByModelNameAndHighestScore, initializeCache,
    getForEachModelNameTheHighestScore, getModelByModelNameAndTopHighestScore,
    getModelByFileSize, getModelsByTopFileSize, getModelByFileSizeAndScore
} = require('./functions')

server.listen(port, () => console.log(`Empirical server listing on port ${port}`))

initializeCache()

//Get all models
app.get('/models', (req, res) => {
    res.send(getAllModels())
})

//Get all models by score order
app.get('/models/score', (req, res) => {
    res.send(getModelsByHighestScore())
})

//Get model with highest score
app.get('/model/score', (req, res) => {
    res.send(getModelsByTopHighestScore(1))
})

//Get top x models by score order
app.get('/models/score/:number', (req, res) => {
    const {number} = req.params

    res.send(getModelsByTopHighestScore(number))
})

//Get models by model name
app.get('/models/name/:name', (req, res) => {
    const {name} = req.params

    res.send(getModelByModelName(name))
})

//Get models by model name and score order
app.get('/models/score/name/:name', (req, res) => {
    const {name} = req.params

    res.send(getModelByModelNameAndHighestScore(name))
})

//Get model by model name and highest score
app.get('/model/score/name/:name', (req, res) => {
    const {name} = req.params

    res.send(getModelByModelNameAndTopHighestScore(name, 1))
})

//Get models by name and top highest score
app.get('/models/score/:number/name/:name', (req, res) => {
    const {name, number} = req.params

    res.send(getModelByModelNameAndTopHighestScore(name, number))
})

//Get for each model_name the highest score
app.get('/models/names/score', (req, res) => {
    res.send(getForEachModelNameTheHighestScore())
})

//Get models by file size
app.get('/models/size', (req, res) => {
    res.send(getModelByFileSize())
})

//Get top models by file size
app.get('/models/size/score/:number', (req, res) => {
    const {number} = req.params

    res.send(getModelsByTopFileSize(number))
})

app.get('/models/fmin/:fmin/fmax/:fmax/smin/:smin/smax/:smax', (req, res) => {
    const {fmin, fmax, smin, smax} = req.params

    res.send(getModelByFileSizeAndScore(fmin, fmax, smin, smax))
})