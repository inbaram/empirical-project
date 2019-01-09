const assert = require('chai').assert
const mockData = require('./mockData')
const mockDataResult = require('./mockDataResult')
const func = require('../functions')

func.initializeCache(mockData)
describe('testing the function', () => {
    before(() => {
        func.initializeCacheTest(mockData)
    })

    it('should return highest score 20', () => {
        const highestScore = func.getModelsByTopHighestScore(1)[0].model_score
        assert.equal(highestScore, 20)
    })

    it('should return top 5 models with highest score', () =>{
        const models = func.getModelsByTopHighestScore(5)
        const result = mockDataResult["top_5_models_highest_score"]

        assert.deepEqual(models, result)
    })

    describe('should return for model name the highest score', () => {

        it('model_name 2 highest score 5', () => {
            const model1 = func.getModelByModelNameAndHighestScore("2")[0]
            assert.equal(model1.model_score, 5)
        })

        it('model_name 7 highest score 3', () => {
            const model2 = func.getModelByModelNameAndHighestScore("7")[0]
            assert.equal(model2.model_score, 3)
        })

        it('model_name 6 highest score 20', () => {
            const model3 = func.getModelByModelNameAndHighestScore("6")[0]
            assert.equal(model3.model_score, 20)
        })

    })

    it('should return for each model name the highest score', () => {
        const models = func.getForEachModelNameTheHighestScore()
        const result = mockDataResult["all_models_names_highest_score"]

        assert.deepEqual(models, result)
    })

    it('should return top 5 models sorted by file size and score', () => {
        const models = func.getModelsByTopFileSize(5)
        const result = mockDataResult["top_5_models_file_size_and_score"]

        assert.deepEqual(models, result)
    })

    describe('should return models that in range', () => {
        it('file size: 0-20, score: 0-100', () => {
            const models = func.getModelByFileSizeAndScore(0,20,0,100)

            assert.equal(models.length, 2)
        })

        it('file size: 0-20, score: 15-20', () => {
            const models = func.getModelByFileSizeAndScore(0,20,15,20)

            assert.equal(models.length, 0)
        })

        it('file size: 0-150, score: 15-20', () => {
            const models = func.getModelByFileSizeAndScore(0,150,15,20)

            assert.equal(models.length, 1)
        })

        it('file size: 0-150, score: 10-20', () => {
            const models = func.getModelByFileSizeAndScore(0,150,10,20)

            assert.equal(models.length, 2)
        })
    })
})
