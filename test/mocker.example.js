var mocker = require('../build/mocker.js')
var util = require('util')

var config = {
    situation: {
        exampleVirtual:{
            incrementalId: 0,
            virtual: true
        },
        id: {
            function() {
                return this.object.exampleVirtual
            }
        },
        places: {
            values: ['HOUSE', 'CAR', 'MOTORBIKE']
        }
    },
    cat: {
        name:{
            values: ['txuri', 'pitxi', 'kitty']
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
