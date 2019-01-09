const fs = require('fs')
const bayes = require('./models/bayes.json')
const bayes2 = require('./models/bayes2.json')
const svr = require('./models/svr.json')
const appRoot = process.env.PWD || '.'

const models = [bayes, bayes2, svr]
let modelsCache = []

const initializeCache = () => {
    models.map(m => {
        const model_path = process.env.PWD ? m.model_path.replace(/\\/g, '//') : m.model_path
        const fileSize = getFileSizeInBytes(model_path)
        m.file_size = fileSize
        modelsCache.push(m)
    })

    console.log('finish initializing modelsCache')
}

const initializeCacheTest = mockData => {
    modelsCache = mockData
}


const getFileSizeInBytes = filename => {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}

const getAllModels = () => {
    return modelsCache
}

const sortModelsByHighestScore = arr => {
    const _arr = arr || modelsCache
    return _arr.concat().sort((a, b) =>
        (a.model_score > b.model_score) ? -1 : ((b.model_score > a.model_score) ? 1 : 0))
}

const sortModelsByFileSize = arr => {
    const _arr = arr || modelsCache
    return _arr.concat().sort((a, b) =>
        (a.file_size < b.file_size) ? -1 : ((b.file_size < a.file_size) ? 1 : 0))
}

const getModelsByHighestScore = () => sortModelsByHighestScore()

const getModelsByTopHighestScore = x => sortModelsByHighestScore().slice(0,x)

const getModelByModelName = name => modelsCache.filter(m => m.model_name == name)

const getModelByModelNameAndHighestScore = name => sortModelsByHighestScore(getModelByModelName(name))

const getModelByModelNameAndTopHighestScore = (name, x) => getModelByModelNameAndHighestScore(name).slice(0,x)

const getForEachModelNameTheHighestScore = () => {
    const res = {}
    const resArr = sortModelsByHighestScore().filter(m => {
        if(!res[m.model_name]) {
            res[m.model_name] = 1
            return true
        } else {
            return false
        }
    })

    return resArr
}

const getModelByFileSize = () =>  sortModelsByFileSize()

const getModelsByTopFileSize = x => sortModelsByFileSize(sortModelsByHighestScore()).slice(0,x)

const getModelByFileSizeAndScore = (fmin, fmax, smin, smax) => {
    const arr = modelsCache.filter(m =>
        m.file_size >= fmin && m.file_size <= fmax && m.model_score >= smin && m.model_score <= smax)
    return sortModelsByHighestScore(arr)
}

module.exports = {
    initializeCache,
    getAllModels,
    getModelsByHighestScore,
    getModelsByTopHighestScore,
    getModelByModelName,
    getModelByModelNameAndHighestScore,
    getModelByModelNameAndTopHighestScore,
    getForEachModelNameTheHighestScore,
    getModelByFileSize,
    getModelsByTopFileSize,
    getModelByFileSizeAndScore,
    initializeCacheTest,
}

