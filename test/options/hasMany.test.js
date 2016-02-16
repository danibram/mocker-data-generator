var mocker = require('../../lib')
var expect = require('chai').expect
var assert = require('chai').assert
var faker = require('faker')
var util = require('util')

describe('Options: hasOne', function() {
    it('Should get hasOne entity', function(done) {
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
            user: {
                hasMany: 'user'
            },
            users: {
                hasMany: 'user',
                amount: 3
            },
            usersMax4: {
                hasMany: 'user',
                max: 4
            },
            usersMin2: {
                hasMany: 'user',
                min: 2
            },
            usersMin1Max3: {
                hasMany: 'user',
                min: 1,
                max: 3
            }

        };
        var m = mocker()
        m.schema('user', user, 2)
            .schema('act', act, length)
            .build(function(data) {
                console.log(util.inspect(data, {depth:10}))
                expect(data.act.length).to.equal(length)
                done()
            })
    })
})
