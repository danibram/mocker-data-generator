var mocker = require('..').default
var util = require('util')
var faker = require('faker')

var cat2 = {
    name: { static: 'txuri' },
    emails: [
        {
            faker: 'internet.email()',
            length: 2
        }
    ],
    get: {
        function() {
            return this.object.emails[0]
        }
    }
}

console.time('bench')
mocker()
    .addGenerator('faker', faker)
    .schema('cat', cat2, 1)
    .build(function (err, data) {
        console.log(err)
        console.timeEnd('bench')
        console.log(util.inspect(data, { depth: 10 }))
    })
