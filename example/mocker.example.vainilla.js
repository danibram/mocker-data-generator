var mocker = require('../build/main/index.js').default
var util = require('util')
var moment = require('moment')

var cat = {
    name: ['txuri', 'pitxi', 'kitty']
}

var cat2 = {
    name: ['txuri', 'pitxi', 'kitty'],
    emails: [
        {
            faker: 'lorem.words()[0]',
            length: 10,
            concat: '[object.name, object.name]',
            concatStrict: true,
            fixedLength: true
        }
    ],
    get: {
        function() {
            return this.object.emails[0]
        }
    }
}

var start = moment()
var m = mocker()
    .schema('cat', cat2, 1)
    .build(function(err, data) {
        console.log('Time: ' + moment().diff(start, 'ms') + ' ms')
        console.log(util.inspect(data, { depth: 10 }))
    })
