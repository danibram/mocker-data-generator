# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.0"></a>
# [2.0.0](https://github.com/danibram/mocker-data-generator/compare/v1.2.7...v2.0.0) (2017-03-18)


### Features

* **build:** new build using Typescript, breaking change in imports, adapted import to be used with es6 ([6114eaf](https://github.com/danibram/mocker-data-generator/commit/6114eaf))

### OLD Release History

#### (1.2.7)
- Fix little issue with array generators, now parse well the index inside, add a test for that
- Fix string issue with fakerJs
- Fixed babel polyfill issues
- updates on dev packages

#### (1.2.2)
- Better error management
- Added eval methods
- Update docs with the online mocker-api: https://mocker-api.herokuapp.com/

#### (1.2.1)
- Start to parse better the errors

#### (1.2.0)
- New internal reorganization
- Added hasOne (related is deprecated) and hasMany
- ***Breaking Change***: related config is deprecated, instead of related use hasOne.

#### (1.1.1)
- Added RandExpJs generator
- Improve test system (I know im improving it! =P)
- ***Breaking Change***: the older versions aren´t compatible with this module, the way to generate the data are changed:
#### (1.1.0)
- Added casualJs
- Added self option
- Added db option
- Added related option

#### (1.0.6)
- Updated chance.js to 1.0

#### (1.0.5)
- Added the concat option, and the strictConcat on Array generator.

#### (1.0.4)
- Added on uniqueField two ways to generate the data
- Starting to add errors

#### (1.0.3)
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
