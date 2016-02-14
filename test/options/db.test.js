var mocker = require('../../lib')
var expect = require('chai').expect
var assert = require('chai').assert
var faker = require('faker')
var util = require('util')

describe('Options: db', function() {
    it('Should get db', function(done) {
        var length = 10
        var user = {
            id: {
                faker: 'random.number'
            },
            name: {
                faker: 'name.firstName'
            }
        };
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
            user_id: {
                db: 'user[0].id'
            }
        };
        var m = mocker()
        m.schema('user', user, 2)
            .schema('act', act, length)
            .build(function(data) {
                expect(data.act.length).to.equal(length)
                expect(data.act[0].user_id).to.equal(data.user[0].id)
                done()
            })
    })
})
