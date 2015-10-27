var mocker = require('../build/mocker.js')
var util = require('util')

var config = {
    situation: {
        values: ['HOUSE', 'CAR', 'MOTORBIKE']
    },
    cat: {
        static: 'kitty'
    },
    catSituation: {
        function: function() {
            return this.db.cats[0] + ' in ' + this.faker.random.arrayElement(this.db.categories)
        }
    }
}

var m = mocker(config)

// m.generate('user', 4)
// .then(m.generate('group', 2))
// .then(m.generate('conditionalField', 2))
m.generate('situation', {uniqueField: '.'})
    .then(m.generate('conditionalField', 2))
    .then(m.generate('cat', 2))
    .then(m.generate('catSituation', 2))
    .then(function(data) {
        console.log(util.inspect(data, { depth: 10 }))
    })
