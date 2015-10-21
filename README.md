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
Data generation goes with model based composed by generators, the generators can have access to the data generated and to the entity generated. ***Generators run syncronously, take care of the related entities!!***

#### Model definition

Every model should contains the specified fields, ***right now not support more levels***. Every key should be the final key:

- ***Normal string***: indicates the key.
- ***Comaseparated string***: indicates that there is a conditional, before the coma you must specify a conditional (you have all level fields generated in this moment)

Inside every value you can put:

- ***funcion***: No params are passed, only context (```this```), in this you have ```{db, object, faker}```, and you can use faker functions, object (the specified model), db (actual data generated)
- ***faker***: you can use directly faker functions without params, if you need to pass params, use function and inside use ```this.faker``` and the normal function
- ***[Array]***: you can pass an array that indicates an array of data you can create, passing in the first field the generator (function, faker, or array(not Tested)), and in the second field pass a config object (length, fixedLentgh)
   - ***length***: to know how many values
   - ***fixedLength***: true to create always same amount of values in the array, false to generate a random number bettwen 0 and 'length' value.

#### More, Comming soon

## Release History

####(0.0.2-0.0.3)
- Update README.md

####(0.0.1)
- First release i will update soon with tests and more examples, stay tuned!

## Development

Run ```npm run dev``` to watch the proyect, webpack compile the code automatically.

## License
Licensed under the MIT license. 2015
