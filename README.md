# mocker-data-generator

[![Dependency Status](https://david-dm.org/danibram/mocker-data-generator.svg)](https://david-dm.org/danibram/mocker-data-generator) [![Build Status](https://travis-ci.org/danibram/mocker-data-generator.svg)](https://travis-ci.org/danibram/mocker-data-generator)

A simplified way to generate masive mock data based on a schema, and you can use super cool libraries like fakerJs and chanceJs to generate fake data.

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

Every model should contains the specified fields. Key can be 2 types:

- ***Normal string*** key: indicates the key.
- ***Comaseparated string*** key: indicates that there is a conditional, before the coma you must specify a conditional (you have all level fields generated in this moment), then you must specify the field if the conditional is true see the example.

Inside every value you can put:

- ***static***: For fixed fields

    ```javascript
        { static: 'hello im fixed field' }     
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
        { faker: 'random.arrayElement(db.users)[userId]' }  //Run faker.arrayElement over a generated user entity and take the userId only
    ```

- ***chance***: you can use directly chance functions, you can do: (note that, db (actual entities generated), object (actual entity generated) are injected), ***you must pass an exactly JSON syntax***:

    ```javascript
        { chance: 'integer' }                                //Run chance.integer()
        { chance: 'integer()' }                              //Run chance.integer()
        { chance: 'integer({"min": 1, "max": 10})' }         //Run chance.integer({"min": 1, "max": 10})
        { chance: 'street_suffixes()[0]["name"]' }           //Run chance.street_suffixes() takes first result and the name inside
    ```

- ***[Array]***: you can pass an array that indicates an array of data you can create, passing in the first field the generator (function, faker, or array(not Tested)), and in the second field pass a config object (length, fixedLentgh)
   - ***length***: to know how many values
   - ***fixedLength***: true to create always same amount of values in the array, false to generate a random number bettwen 0 and 'length' value.

    ```javascript
    [{
        //Any generator
            //Faker  
        faker: 'random.arrayElement(db.users)[userId]'
            //Chance  
        chance: 'integer'
            //Function  
        function: function (){ return /**/ }

        //Array config
        length: 10,
        fixedLength: false
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

You can also pass instead of the number, an object with the a config, from now ```{uniqueField}```. If this field exists tells to the generator that instead of init a fixed length of data, generate an amount of data depending of the values of the field you will specify. See the output of this example:

```javascript
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
```

#### More, Comming soon

## Release History

#### (1.0.1)
- Fix Arrays
- ***Breaking Change***: the older versions aren´t compatible with this module, the way to generate the data are changed:

    ```javascript
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
    ```

#### (0.7.0)

- ***Breaking Change***: Added the posibility to enable the pluralize on the output entity. Now if you want to pluralize the output follow the example in the doc, ***by defatult is not anymore pluralized***.

    Old call configuration:
    ``` javascript
    var m = mocker(config)
    m.generate('user', 2)
        .then(m.generate('group', 2))
        .then(m.generate('conditionalField', 2))
        .then(function(data) {
            console.log(util.inspect(data, { depth: 10 }))
    //This returns an object
    // {
    //      user:[array of users],
    //      group: [array of groups],
    //      conditionalField: [array of conditionalFields]
    // }
            })
    ```

    New array configuration:
    ``` javascript
    var m = mocker(config)
    m.generate('user', 2)
        .generate('group', 2)
        .generate('conditionalField', 2)
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

#### (0.6.0)
- ***Breaking Change***: Added the posibility to enable the pluralize on the output entity. Now if you want to pluralize the output follow the example in the doc, ***by defatult is not anymore pluralized***.

#### (0.5.0)
- ***Breaking Change***: Break Point with array config. Now is more clear.

    Old array configuration:
    ```javascript
        [{
            //Any generator
                //Faker  
            faker: 'random.arrayElement(db.users)[userId]'
                //Chance  
            chance: 'integer'
                //Function  
            function: function (){ return /**/ }

        }, //Array config
        {length: 10, fixedLength: false}]
    ```

    New array configuration:
    ```javascript
        [{
            //Any generator
                //Faker  
            faker: 'random.arrayElement(db.users)[userId]'
                //Chance  
            chance: 'integer'
                //Function  
            function: function (){ return /**/ }

            //Array config
            length: 10,
            fixedLength: false
        }]
    ```

#### (0.4.7)
- Add virtual fields

#### (0.4.5)
- Add incrementalId config
- Some tweaks on dev config to start to use generators on typescript
- Performance tweaks for large data generation

#### (0.4.1)
- Show in console the errors. (I will improve this)
- Add support to chanceJs, exactly like FakerJs (see "Model definition" ***Chance***)

#### (0.3.0)
- Fix errors on iteration over nested structures (new improved interator)
- Added support to call more naturally to FackerJs fields (see "Model definition" ***Faker***)

#### (0.2.2)
- Added a pluralization function
- Fixed a little issue with the roots schemas (now you can do really crazy things, see test/mocker.example.js)
- Fix errors introduced in 0.2.0

#### (0.1.6)
- Fix an error: (Clean initial data field)
- Fix some memory errors adding inmutableJS for the model
- Add new tests

#### (0.1.1)
- Real Refractor of the code
- Add support multi-level schemas
- Add tests
- Add travis support

#### (0.0.4)
- First release i will update soon with tests and more examples, stay tuned!

## Development

Run ```npm install;npm run dev``` to watch the proyect, webpack compile the code automatically.
Run ```npm build``` to build the normal and minified version.

## Why not use json-schema-faker?

json-schema-faker is awesome and works really nice, but i need a simplified and fast way to generate mock data for my proyects, so i created this.

## License
Licensed under the MIT license. 2015
