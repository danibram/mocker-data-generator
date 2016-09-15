var mocker = require('../../lib')
var expect = require('chai').expect
var assert = require('chai').assert
var faker = require('faker')
var util = require('util')

var m = mocker()

describe('Options: FakerJs', function() {
    it('Should be "lorem.words"', function(done) {
        try {
            var res = m.proccessLeaf({
                faker: 'lorem.words'
            })
            expect(res)
                .to.be.an('string')
                .not.to.be.null
                .to.not.be.undefined
            done()
        } catch (x) {
            done(x)
        }
    })

    it('Should be "lorem.words()"', function(done) {
        try {
            var res = m.proccessLeaf({
                faker: 'lorem.words()'
            })
            expect(res)
                .to.be.an('string')
                .not.to.be.null
                .to.not.be.undefined
            done()
        } catch (x) {
            done(x)
        }
    })

    it('Should be "lorem.words(1)"', function(done) {
        try {
            var res = m.proccessLeaf({
                faker: 'lorem.words(1)'
            })
            expect(res).to.be.an('string')
            done()
        } catch (x) {
            done(x)
        }
    })

    it('Should be "random.number({"max": 1})"', function(done) {
        try {
            var res = m.proccessLeaf({
                faker: 'random.number({"max": 1})'
            })
            expect(res)
                .to.be.a('number')
                .to.not.be.null
                .to.not.be.undefined
            done()
        } catch (x) {
            done(x)
        }
    })

    it('Should be "random.number({"min": 1, "max": 2})"', function(done) {
        try {
            var res = m.proccessLeaf({
                faker: 'random.number({"min": 1, "max": 2})'
            })
            expect(res)
                .to.be.a('number')
                .to.not.be.null
                .to.not.be.undefined
            done()
        } catch (x) {
            done(x)
        }
    })

    it('Should be "lorem.words()[0]"', function(done) {
        try {
            var res = m.proccessLeaf({
                faker: 'lorem.words()[0]'
            })
            expect(res)
                .to.be.a('string')
                .to.not.be.null
                .to.not.be.undefined
            done()
        } catch (x) {
            done(x)
        }
    })

    it('Should be "lorem.words(1)[0]"', function(done) {
        try {
            var res = m.proccessLeaf({
                faker: 'lorem.words(1)[0]'
            })
            expect(res)
                .to.be.a('string')
                .to.not.be.null
                .to.not.be.undefined
            done()
        } catch (x) {
            done(x)
        }
    })
})
