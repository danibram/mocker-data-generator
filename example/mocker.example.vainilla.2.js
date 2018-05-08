var mocker = require('../build/main/index.js').default
var util = require('util')
var moment = require('moment')

// var conditional = {
//     condition: {
//         faker: 'helpers.randomize(["email", "user"])'
//     },
//     'object.condition==="email",show': {
//         static: 'email'
//     },
//     'object.condition==="user",show': {
//         static: 'user'
//     },
//     'object.condition==="email",email': {
//         hasOne: 'emails'
//     },
//     'object.condition==="user",user': {
//         hasOne: 'users'
//     }
// }

// var user = { faker: 'name.findName' }
// var email = { faker: 'internet.email' }

// var start = moment()
// var m = mocker()
//     .schema('users', user, 2)
//     .schema('emails', email, 2)
//     .schema('situation', conditional, 3)
//     .build(function(err, data) {
//         console.log('Time: ' + moment().diff(start, 'ms') + ' ms')
//         console.log(util.inspect(data, { depth: 10 }))
//     })

var cat = {
    id: {
        incrementalId: 0
    }
}
var room = {
    cats: {
        chance: 'pickone(db.cats)', // works fine
        eval: true
    }
}

mocker()
    .schema('cats', cat, 9)
    .schema('rooms', room, 1)
    .build(function(err, data) {
        console.log('test eval')
        console.log(util.inspect(data, { depth: 10 }))
    })
