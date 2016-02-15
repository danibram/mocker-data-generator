# mocker-data-generator

[![NPM](https://nodei.co/npm/mocker-data-generator.png?downloads=true&stars=true)][npm-home-module]

[![npm version](https://img.shields.io/npm/v/mocker-data-generator.svg?style=flat-square)][npm-home-module]

[![Version](https://img.shields.io/travis/danibram/mocker-data-generator.svg?style=flat-square)][travis]
[![Build status](https://ci.appveyor.com/api/projects/status/bp9uy3nq679r5w0a?svg=true)][appveyor]

[![Dependency Status](https://img.shields.io/david/danibram/mocker-data-generator.svg?style=flat-square)][npm-home-module][![DevDependency Status](https://img.shields.io/david/dev/danibram/mocker-data-generator.svg?style=flat-square)][npm-home-module]

[![GitHub license](https://img.shields.io/github/license/danibram/mocker-data-generator.svg?style=flat-square)][npm-home-module][![GitHub license](https://img.shields.io/npm/dt/mocker-data-generator.svg?style=flat-square)][npm-home-module][![GitHub license](https://img.shields.io/badge/awesome-true-orange.svg?style=flat-square)][npm-home-module]


A simplified way to generate masive mock data based on a schema, using the awesome fake/random data generators like (FakerJs, ChanceJs, CasualJs and RandExpJs), all in one tool to generate your fake data for testing.

## Getting started

Install the module with: `npm install mocker-data-generator`

```javascript
var user = {
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
};
var group = {
    description: {
        faker: 'lorem.paragraph'
    },
    users: [{
        function: function() {
            return this.faker.random.arrayElement(this.db.users).username
        },
        length: 10,
        fixedLength: false
    }]
};
var conditionalField = {
    type:{
        values: ['HOUSE', 'CAR', 'MOTORBIKE']
    },
    'object.type=="HOUSE",location':{
        faker: 'address.city'
    },
    'object.type=="CAR"||object.type=="MOTORBIKE",speed':{
        faker: 'random.number'
    }
};

mocker()
    .schema('user', user, 2)
    .schema('group', group, 2)
    .schema('conditionalField', conditionalField 2)
    .build(function(data) {
        console.log(util.inspect(data, { depth: 10 }))
//This returns an object
// {
//      user:[array of users],
//      group: [array of groups],
//      conditionalField: [array of conditionalFields]
// }
        })
```

## Documentation
Data generation goes with model based composed by generators, the generators can have access to the data generated and to the entity generated. ***Generators run syncronously, take care of the related entities!!***

#### Model definition

##### Every model should contains the specified fields. Key can be 2 types:

- ***Normal string*** key: indicates the key.
- ***Comaseparated string*** key: indicates that there is a conditional, before the coma you must specify a conditional (you have all level fields generated in this moment), then you must specify the field if the conditional is true see the example.

##### Inside every value you can put:

- ***static***: For fixed fields

    ```javascript
        { static: 'hello im fixed field' }     
    ```

- ***self***: get himself object, and evaluate the string, so you can get calculated fields.

    ```javascript
        { self: 'id' } //will get the id of the generated entity
    ```

- ***db***: get the db, and evaluate the string, so you can access to this entities.

        ```javascript
            { db: 'user[0].id' } //will get the first user id
        ```

- ***related***: You can pass 2 paramters:
    - ***related***: the name of the related entity, get one random.
    - ***get***: Optional string that will be evaluated over the random related entity.


    ```javascript
        {
            related: 'user' //this populate the field with one random user
        }

        //OR:

        {
            related: 'user',
            get: 'id' //this populate the field with one id of a random user
        }    
    ```

- ***incrementalId***: For incremental numeric ids, pass the start number to increment. If you put incrementalId = true it takes from 0 the ids.

    ```javascript
        { incrementalId: 0 }     
    ```

- ***funcion***: No params are passed, only context (```this```), in this you have ```{db, object, faker, chance}```, and you can use faker or chance functions, object (the specified model), db (actual data generated)

    ```javascript
        { function: function(){
            //this.db
            //this.object
            //this.faker
            //this.chance
            return yourValue
        } }

        //OR:

        { function(){
            //this.db
            //this.object
            //this.faker
            //this.chance
            return yourValue
        } }     
    ```

- ***faker***: you can use directly faker functions like: (note that, db (actual entities generated), object (actual entity generated) are injected), ***you must pass an exactly JSON syntax***:

    ```javascript
        { faker: 'lorem.words' }                            //Run faker.lorem.words()
        { faker: 'lorem.words()' }                          //Run faker.lorem.words()
        { faker: 'lorem.words(1)' }                         //Run faker.lorem.words(1)
        { faker: 'integer({"min": 1, "max": 10})' }         //Run faker.lorem.words(1) and take the first
        { faker: 'random.arrayElement(db.users)' }          //Run faker.arrayElement over a generated user entity
        { faker: 'random.arrayElement(db.users)["userId"]' }  //Run faker.arrayElement over a generated user entity and take the userId only
    ```

- ***chance***: you can use directly chance functions, you can do: (note that, db (actual entities generated), object (actual entity generated) are injected), ***you must pass an exactly JSON syntax***:

    ```javascript
        { chance: 'integer' }                                //Run chance.integer()
        { chance: 'integer()' }                              //Run chance.integer()
        { chance: 'integer({"min": 1, "max": 10})' }         //Run chance.integer({"min": 1, "max": 10})
        { chance: 'street_suffixes()[0]["name"]' }           //Run chance.street_suffixes() takes first result and the name inside
    ```

- ***casual***: you can use directly use casualJs functions, you can do: (note that, db (actual entities generated), object (actual entity generated) are injected), ***you must pass an exactly JSON syntax***:

    ```javascript
        { casual: 'country' }
        { chance: 'array_of_digits()' }
        { casual: 'array_of_digits(3)[0]' }
    ```

- ***randexp***: pass a regexp string to use randexp generator.

    ```javascript
        { randexp: /hello+ (world|to you)/ }
    ```

- ***[Array]***: you can pass an array that indicates an array of data you can create, passing in the first field the generator (function, faker, or array(not Tested)), and in the second field pass a config object (length, fixedLentgh)
   - ***length***: to know how many values
   - ***fixedLength***: true to create always same amount of values in the array, false to generate a random number bettwen 0 and 'length' value. False by default.
   - ***concat***: An stringuified array ex: '[object.id, db.users.id]'. This should be an evaluable string to concat with the array that are generating. Also takes in mind that if you have a fixedLength, should not increase the lenght.
   - ***strictConcat***: true to remove duplicates in the concated string array, when it is calculated. False by default.

    ```javascript
    [{
        //Any generator
            //Faker  
        faker: 'random.arrayElement(db.users).userId'
            //Chance  
        chance: 'integer'
            //Function  
        function: function (){ return /**/ }

        //Array config
        length: 10,
        fixedLength: true

        //Concat
        concat: '[db.users[0].userId, db.users[1].userId]'
        strictConcat: true
    }]     
    ```

#### Optional fields
- ***[virtual]***: Boolean, if you pass this option, this mean that this field will not appear at the output entity. But you can use during the generation.

```javascript
    {
        //Any generator
            //Faker  
        faker: 'random.arrayElement(db.users)[userId]'
            //Chance  
        chance: 'integer'
            //static
        static: 'any static field'
            //Function  
        function: function (){ return /**/ }

        //with the virtual option
        virtual: true

    }     
```

#### Data generation
Initialize mocker with the config, and then generate any entity with promises style, use generate function that accepts the name of the model and the amount of data to generate. Like the example:

```javascript
mocker()
    .schema('user', user, 2)
    .schema('group', group, 2)
    .schema('conditionalField', conditionalField, 2)
    .build(function(data) {
        console.log(util.inspect(data, { depth: 10 }))
//This returns an object
// {
//      user:[array of users],
//      group: [array of groups],
//      conditionalField: [array of conditionalFields]
// }
        })
```

You can also pass instead of the number, an object with the a config, from now ```{uniqueField}```. If this field exists tells to the generator that instead of init a fixed length of data, generate an amount of data depending of the values of the field you will specify.
You have 2 way to deal with this, check the examples
See the output of this example:

```javascript
//
// First way, using an 'values' embebbed object
//

var cat = {
    name: {
        values: ['txuri', 'pitxi', 'kitty']
    }
};
var m = mocker()
    .schema('cat', cat, 10)
    .schema('cat2', cat, {uniqueField: 'name'})
    .build(function(data){
        console.log(util.inspect(data, {depth:10}))
    })

//
// Second way, without 'values' embebbed.
//

var cat = {
    name: ['txuri', 'pitxi', 'kitty']
};
var m = mocker()
    .schema('cat', cat, 10)
    .schema('cat2', cat, {uniqueField: 'name'})
    .build(function(data){
        console.log(util.inspect(data, {depth:10}))
    })
```

#### More, Comming soon

## Development

Run ```npm install;npm run dev``` to watch the proyect, webpack compile the code automatically.
Run ```npm build``` to build the normal and minified version.

## Why not use json-schema-faker?

json-schema-faker is awesome and works really nice, but i need a simplified and fast way to generate mock data for my proyects, so i created this.

## License
Licensed under the MIT license. 2015


[npm-home-module]: https://www.npmjs.com/package/mocker-data-generator
[appveyor]: https://ci.appveyor.com/project/danibram/mocker-data-generator
[travis]: https://travis-ci.org/danibram/mocker-data-generator
