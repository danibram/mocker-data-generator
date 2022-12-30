var mocker = require('../build/main/index.js').default
var util = require('util')

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
    .build(function (err, data) {
        console.log('test eval')
        console.log(util.inspect(data, { depth: 10 }))
    })
