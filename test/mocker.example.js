var mocker = require('../build/mocker.js')
var util = require('util')

var config = {
    situation: {
        hey:{
            values: ['HOUSE', 'CAR', 'MOTORBIKE']
        },
        you: {
            values: ['HOUSE', 'CAR', 'MOTORBIKE']
        },
        deeper: {
            example: {
                values: ['HOUSE', 'CAR', 'MOTORBIKE']
            }
        }
    }
}

var m = mocker(config)

// m.generate('user', 4)
// .then(m.generate('group', 2))
// .then(m.generate('conditionalField', 2))
m.generate('situation', 1)

    .then(function(data) {
        console.log(util.inspect(data, { depth: 10 }))
    })
