# mocker-data-generator

A simplified way to generate masive mock data. This proyect is also to learn how to use webpack with ES6 syntax and typescript.

## Getting started

Install the module with: `npm install mocker-data-generator`

```javascript
var config = {
    user: {
        firstName: {
            faker: 'name.firstName'
        },
        lastName: {
            faker: 'name.lastName'
        },
        country: {
            faker: 'address.country'
        },
        createdAt: {
            faker: 'date.past'
        },
        username:{
            function: function() {
                return this.object.lastName.substring(0, 5) + this.object.firstName.substring(0, 3) + Math.floor(Math.random() * 10)
            }
        }
    },
    group: {
        description: {
            faker: 'lorem.paragraph'
        },
        users: [{
            function: function() {
                return this.faker.random.arrayElement(this.db.users).username
            }
        }, {length: 10, fixedLength: false}],
    },
    conditionalField: {
        type:{
            values: ['HOUSE', 'CAR', 'MOTORBIKE']
        },
        'object.type=="HOUSE",location':{
            faker: 'address.city'
        },
        'object.type=="CAR"||object.type=="MOTORBIKE",speed':{
            faker: 'random.number'
        }
    }
}

var m = mocker(config)

m.generate('user', 2)
    .then(m.generate('group', 2))
    .then(m.generate('conditionalField', 2))
    .then(function(data) {
        console.log(util.inspect(data, { depth: 10 }))
//This returns an object
// {
//      users:[array of users],
//      groups: [array of groups],
//      conditionalFields: [array of conditionalFields]
// }
        })
```

## Documentation
#### Comming soon

## Release History

####(0.0.1)
- First release i will update soon with tests and more examples, stay tuned!

## Development

Run ```npm run dev``` to watch the proyect, webpack compile the code automatically.

## License
Licensed under the MIT license. 2015
