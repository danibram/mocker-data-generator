var mocker = require('../build/main').default
var faker = require('faker')
var Randexp = require('randexp')
var util = require('util')

var user = {
    firstName: {
        faker: 'name.firstName()'
    },
    notes: {
        randexp: /hello+ (world|to you)/
    }
}

mocker()
    .addGenerator('faker', faker)
    .addGenerator('randexp', Randexp, function (generator, input) {
        return new generator(input).gen()
    })
    .schema('user', user, 2)
    .build(function (error, data) {
        if (error) {
            throw error
        }
        console.log(util.inspect(data, { depth: 10 }))
    })
