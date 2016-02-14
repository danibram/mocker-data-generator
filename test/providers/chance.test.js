var mocker = require('../../lib')
var expect = require('chai').expect
var assert = require('chai').assert
var faker = require('faker')
var util = require('util')

var m = mocker()

describe('Options: ChanceJs', function() {
    it('Should be "integer"', function(done) {
        try {
            var res  = m.proccessLeaf({
                chance: 'integer'
            })

            expect(res)
                .to.be.a('number')
                .not.to.be.null
                .to.not.be.undefined
            done()

        } catch (x) {
            done(x)
        }
    })

    it('Should be "integer()"', function(done) {
        try {
            var res = m.proccessLeaf({
                chance: 'integer()'
            })
            expect(res)
                .to.be.a('number')
                .not.to.be.null
                .to.not.be.undefined
            done()
        } catch (x) {
            done(x)
        }
    })

    it('Should be "integer({"min": 1, "max": 10})"', function(done) {
        try {
            var res = m.proccessLeaf({
                chance: 'integer()'
            })
            expect(res)
                .to.be.a('number')
                .not.to.be.null
                .to.not.be.undefined
            done()
        } catch (x) {
            done(x)
        }
    })

    it('Should be "street_suffixes()[0]["name"]"', function(done) {
        try {
            var res = m.proccessLeaf({
                chance: 'street_suffixes()[0]["name"]'
            })
            expect(res)
                .to.be.a('string')
                .not.to.be.null
                .to.not.be.undefined
            done()

        } catch (x) {
            done(x)
        }
    })
})
