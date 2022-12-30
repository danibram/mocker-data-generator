var mocker = require('../build/main').default
var faker = require('faker')
var util = require('util')

var user = {
    firstName: {
        faker: 'name.firstName()'
    },
    lastName: {
        faker: 'name.lastName()'
    },
    country: {
        faker: 'address.country()'
    },
    createdAt: {
        faker: 'date.past()'
    },
    username: {
        function: function () {
            return (
                this.object.lastName.substring(0, 5) +
                this.object.firstName.substring(0, 3) +
                Math.floor(Math.random() * 10)
            )
        }
    }
}
var group = {
    description: {
        faker: 'lorem.paragraph()'
    },
    users: [
        {
            function: function () {
                return this.generators.faker.random.arrayElement(this.db.user)
                    .username
            },
            length: 10,
            fixedLength: false
        }
    ]
}
var conditionalField = {
    type: {
        values: ['HOUSE', 'CAR', 'MOTORBIKE']
    },
    'object.type=="HOUSE",location': {
        faker: 'address.city()'
    },
    'object.type=="CAR"||object.type=="MOTORBIKE",speed': {
        faker: 'random.number()'
    }
}

// Using traditional callback Style
console.log(faker)
mocker()
    .addGenerator('faker', faker)
    .schema('user', user, 2)
    .schema('group', group, 2)
    .schema('conditionalField', conditionalField, 2)
    .build(function (error, data) {
        if (error) {
            throw error
        }
        console.log(util.inspect(data, { depth: 10 }))
    })
