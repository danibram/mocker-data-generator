var mocker = require('../../lib')
var expect = require('chai').expect
var assert = require('chai').assert
var faker = require('faker')
var util = require('util')

var m = mocker()

describe('Options: CasualJs', function() {
    it('Should be "lorem.words"', function(done) {
        try {
            var res = m.proccessLeaf({
                casual: 'country'
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

    it('Should be "array_of_digits()"', function(done) {
        try {
            var res = m.proccessLeaf({
                casual: 'array_of_digits()'
            })
            expect(res)
                .to.be.an('array')
                .not.to.be.null
                .to.not.be.undefined
            expect(res.length)
                .to.be.a('number')
                .to.be.equal(7)
                .not.to.be.null
                .to.not.be.undefined
            done()
        } catch (x) {
            done(x)
        }
    })

    it('Should be "array_of_digits(3)"', function(done) {
        try {
            var res = m.proccessLeaf({
                casual: 'array_of_digits(3)'
            })
            expect(res)
                .to.be.an('array')
                .not.to.be.null
                .to.not.be.undefined
            expect(res.length)
                .to.be.a('number')
                .to.be.equal(3)
                .not.to.be.null
                .to.not.be.undefined
            done()
        } catch (x) {
            done(x)
        }
    })

    it('Should be "casual.integer(1,2)"', function(done) {
        try {
            var res = m.proccessLeaf({
                casual: 'integer(1,2)'
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
})
