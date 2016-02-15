var mocker = require('../../lib')
var expect = require('chai').expect
var assert = require('chai').assert
var faker = require('faker')
var util = require('util')

var m = mocker()

describe('Options: RandexpJs', function() {
    it('Should be "/hello+ (world|to you)/"', function(done) {
        try {
            var res = m.proccessLeaf({
                randexp: /hello+ (world|to you)/
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
