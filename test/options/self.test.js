var mocker = require('../../lib')
var expect = require('chai').expect
var assert = require('chai').assert
var faker = require('faker')
var util = require('util')

describe('Options: self', function() {
    it('Should get fieldss', function(done) {
        var length = 10
        var act = {
            id: {
                faker: 'random.number'
            },
            request: {
                id: {
                    faker: 'random.number'
                },
                title: {
                    faker: 'lorem.sentence'
                }
            },
            title: {
                faker: 'lorem.sentence'
            },
            request_id: {
                self: 'request.id'
            }
        };
        var m = mocker()
        m.schema('act', act, length)
            .build(function(data) {
                expect(data.act.length).to.equal(length)
                expect(data.act[0].request_id).to.equal(data.act[0].request.id)
                done()
            })
    })
})
