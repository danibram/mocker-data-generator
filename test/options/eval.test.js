var mocker = require('../../lib')
var expect = require('chai').expect
var assert = require('chai').assert
var faker = require('faker')
var util = require('util')

describe('Options: eval', function() {
    it('Should evaluate the fields', function(done) {
        var length = 10
        var user = {
            id: {
                eval: '0'
            },
            evaluadedId: {
                eval: 'object.id'
            }
        };
        var m = mocker()
        m.schema('user', user, 1)
            .build(function(data) {
                try {
                    expect(data.user[0].id).to.equal(data.user[0].evaluadedId)
                    done()
                } catch (x) {
                    done(x)
                }
            })
    })
})
