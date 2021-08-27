# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.12.0](https://github.com/danibram/mocker-data-generator/compare/v2.10.0...v2.12.0) (2021-02-03)

### Features

-   **chore:** updated deps

## [2.10.0](https://github.com/danibram/mocker-data-generator/compare/v2.9.0...v2.10.0) (2020-10-13)

### Features

-   Merged Array Example: [#102](https://github.com/danibram/mocker-data-generator/pull/102)
-   Merged Generic Type for Generator: [#114](https://github.com/danibram/mocker-data-generator/pull/114)

## [2.9.0](https://github.com/danibram/mocker-data-generator/compare/v2.8.0...v2.9.0) (2020-09-04)

### Features

-   add buildSync method to Mocker class ([772b20d](https://github.com/danibram/mocker-data-generator/commit/772b20da6f9ccaba98f20a1361babe5f55810d78))
-   all deps updated!!

### Bug Fixes

-   **appveyor:** update matrix config to install defined node version ([703aa41](https://github.com/danibram/mocker-data-generator/commit/703aa41411b3813f3d1af6e79b6d2643a36dec56))
-   **docs-website:** added seed example ([d1fa143](https://github.com/danibram/mocker-data-generator/commit/d1fa143f20467cf69c87e5cc4a74657429550384))

## [2.8.0](https://github.com/danibram/mocker-data-generator/compare/v2.7.0...v2.8.0) (2020-05-13)

### Features

-   **chore:** easy publish as minor shortcut ([fd1a87b](https://github.com/danibram/mocker-data-generator/commit/fd1a87bfe444817b75af88c91398929fab91b83c))
-   **chore:** update chance and tslib, and some devDependencies ([59d0aea](https://github.com/danibram/mocker-data-generator/commit/59d0aea51fba7ef2e6b1ea153da4aa8007f07170))
-   **Mocker.seed:** add posibility to prepopulate the db. Thanks [@suspiciousfellow](https://github.com/suspiciousfellow) and [@marshallswain](https://github.com/marshallswain) for the idea and the code ([dfb2ad6](https://github.com/danibram/mocker-data-generator/commit/dfb2ad64fe002e4b55dfe71d1d65574d5054d6cc))
-   **Mocker.seed:** add tests ([7faafab](https://github.com/danibram/mocker-data-generator/commit/7faafab779af49434c47ac63631aea9cebbc9be7))
-   **Mocker.seed:** seed and schema and work together ([68970fc](https://github.com/danibram/mocker-data-generator/commit/68970fc3fe7a2072c99d58ed3b1ececd3b6909dd))

## [2.7.0](https://github.com/danibram/mocker-data-generator/compare/v2.6.5...v2.7.0) (2020-04-16)

### All deps updated!

<a name="2.6.6"></a>

## [2.6.6](https://github.com/danibram/mocker-data-generator/compare/v2.6.5...v2.6.6) (2018-09-18)

### Feature

Unique field in hasMany generator

### Bug Fixes

-   **errors:** hasMany added unique error

### All deps updated!

<a name="2.6.5"></a>

## [2.6.5](https://github.com/danibram/mocker-data-generator/compare/v2.6.4...v2.6.5) (2018-09-06)

### All deps updated!

<a name="2.6.4"></a>

## [2.6.4](https://github.com/danibram/mocker-data-generator/compare/v2.6.3...v2.6.4) (2018-05-08)

### Bug Fixes

-   **hasOne:** Issues with eval ([f1ab9e8](https://github.com/danibram/mocker-data-generator/commit/f1ab9e8))

<a name="2.6.3"></a>

## [2.6.3](https://github.com/danibram/mocker-data-generator/compare/v2.6.2...v2.6.3) (2018-05-08)

<a name="2.6.2"></a>

## [2.6.2](https://github.com/danibram/mocker-data-generator/compare/v2.6.1...v2.6.2) (2018-05-08)

### Bug!

-   Fixing bug related to _eval_!

<a name="2.6.1"></a>

## [2.6.1](https://github.com/danibram/mocker-data-generator/compare/v2.5.2...v2.6.1) (2018-03-20)

### Improvements!

-   Now I rework internal part of the generators to offer the posibility of avoid **eval** step, i used eval to offer the maximum flexibility, but now its optional, of course that without eval, is less flexible, but if it fits for your mock data right now you will gain **10x speed**, Awesome!
    Also it offers the posibility of use eval like in the older versions of mocker.

Welcome to the ludicrous speed! 🎉

<a name="2.5.2"></a>

## [2.5.2](https://github.com/danibram/mocker-data-generator/compare/v2.5.1...v2.5.2) (2018-01-17)

### Bug Fixes

-   **generation:** added fix when min = 0 in hasMany, now can produce empty array of data, by default is 1, so you have to specify minimum to 0 in order to have the chance to produce empty arrays ([7f97646](https://github.com/danibram/mocker-data-generator/commit/7f97646))

### All deps updated!

<a name="2.5.0"></a>

# [2.5.0](https://github.com/danibram/mocker-data-generator/compare/v2.4.9...v2.5.0) (2017-11-01)

### Breaking Changes!

-   Now the build method throws the error, in the case of the callback in a traditional style function **function(err, data)** in the case of promise style in the reject.

### Bug Fixes

-   **test:** separate gh-pages generation modules from the mocker modules for development, some test fails ([2cc421e](https://github.com/danibram/mocker-data-generator/commit/2cc421e))
-   Better error throwing and test covered ([20ca0a0](https://github.com/danibram/mocker-data-generator/commit/20ca0a0))

### Bug Fixes

-   **test:** separate gh-pages generation modules from the mocker modules for development, some test fails ([2cc421e](https://github.com/danibram/mocker-data-generator/commit/2cc421e))
-   Better error throwing and test covered ([20ca0a0](https://github.com/danibram/mocker-data-generator/commit/20ca0a0))

<a name="2.4.9"></a>

## [2.4.9](https://github.com/danibram/mocker-data-generator/compare/v2.4.7...v2.4.9) (2017-10-20)

### Features

-   Added browser build
-   Fixes in build to sync with gh-pages

<a name="2.4.5"></a>

## [2.4.5](https://github.com/danibram/mocker-data-generator/compare/v2.4.4...v2.4.5) (2017-10-20)

<a name="2.4.4"></a>

## [2.4.4](https://github.com/danibram/mocker-data-generator/compare/v2.4.3...v2.4.4) (2017-10-17)

### Bug Fixes

-   **fakerjs:** Better locale detector and better testing ([f05872d](https://github.com/danibram/mocker-data-generator/commit/f05872d))

<a name="2.4.3"></a>

## [2.4.3](https://github.com/danibram/mocker-data-generator/compare/v2.4.2...v2.4.3) (2017-10-16)

<a name="2.4.2"></a>

## [2.4.2](https://github.com/danibram/mocker-data-generator/compare/v2.4.1...v2.4.2) (2017-10-16)

<a name="2.4.1"></a>

## [2.4.1](https://github.com/danibram/mocker-data-generator/compare/v2.4.0...v2.4.1) (2017-10-16)

<a name="2.4.0"></a>

# [2.4.0](https://github.com/danibram/mocker-data-generator/compare/v2.2.1...v2.4.0) (2017-10-16)

### Bug Fixes

-   **builder:** fix tslint space identation ([b3f9f7c](https://github.com/danibram/mocker-data-generator/commit/b3f9f7c))

### Features

-   **fakerjs:** Added multilanguaje support ([0b94471](https://github.com/danibram/mocker-data-generator/commit/0b94471))
-   **fakerjs:** Added tests for multilang support ([5078d24](https://github.com/danibram/mocker-data-generator/commit/5078d24))
-   **fakerjs:** Updates on the readme ([b79e88f](https://github.com/danibram/mocker-data-generator/commit/b79e88f))

<a name="2.3.0"></a>

# [2.3.0](https://github.com/danibram/mocker-data-generator/compare/v2.2.1...v2.3.0) (2017-10-16)

### Bug Fixes

-   **builder:** fix tslint space identation ([b3f9f7c](https://github.com/danibram/mocker-data-generator/commit/b3f9f7c))

### Features

-   **fakerjs:** Added multilanguaje support ([0b94471](https://github.com/danibram/mocker-data-generator/commit/0b94471))
-   **fakerjs:** Added tests for multilang support ([5078d24](https://github.com/danibram/mocker-data-generator/commit/5078d24))
-   **fakerjs:** Updates on the readme ([b79e88f](https://github.com/danibram/mocker-data-generator/commit/b79e88f))

<a name="2.2.1"></a>

## [2.2.1](https://github.com/danibram/mocker-data-generator/compare/v2.2.0...v2.2.1) (2017-10-13)

### Bug Fixes

-   **linter:** trying to use supported tslint rule ([5edac70](https://github.com/danibram/mocker-data-generator/commit/5edac70))
-   **updates:** Update libs to last releases ([a6ce60b](https://github.com/danibram/mocker-data-generator/commit/a6ce60b))

<a name="2.2.0"></a>

# [2.2.0](https://github.com/danibram/mocker-data-generator/compare/v2.1.0...v2.2.0) (2017-06-14)

### Features

-   added min max for value generation randomly with tests. thanks [@jhkim-novavin](https://github.com/jhkim-novavin) ([5eaa6f4](https://github.com/danibram/mocker-data-generator/commit/5eaa6f4))

<a name="2.1.0"></a>

# [2.1.0](https://github.com/danibram/mocker-data-generator/compare/v2.0.2...v2.1.0) (2017-05-27)

### Features

-   Added a way to obtain actual array while the generation, [@zamnuts](https://github.com/zamnuts) suggestion ([2588a34](https://github.com/danibram/mocker-data-generator/commit/2588a34))
-   Added length on the array function generator, thanks [@zamnuts](https://github.com/zamnuts) ([1f17519](https://github.com/danibram/mocker-data-generator/commit/1f17519))
-   added PR #16 Add parameter to hasMany generator, thanks [@justinbarry](https://github.com/justinbarry) ([71d947f](https://github.com/danibram/mocker-data-generator/commit/71d947f))

<a name="2.0.2"></a>

## [2.0.2](https://github.com/danibram/mocker-data-generator/compare/v2.0.1...v2.0.2) (2017-05-24)

### Bug Fixes

-   **browserify:** fix browserify builds changing casual to browserify-casual ([de93262](https://github.com/danibram/mocker-data-generator/commit/de93262))

<a name="2.0.1"></a>

## [2.0.1](https://github.com/danibram/mocker-data-generator/compare/v2.0.0...v2.0.1) (2017-05-24)

### Changes

-   **fix:** tslib fix for ES5 builds
-   **updates:** updates on dependencies

<a name="2.0.0"></a>

# [2.0.0](https://github.com/danibram/mocker-data-generator/compare/v1.2.7...v2.0.0) (2017-03-18)

### Features

-   **build:** new build using Typescript, breaking change in imports, adapted import to be used with es6 ([6114eaf](https://github.com/danibram/mocker-data-generator/commit/6114eaf))

### OLD Release History

#### (1.2.7)

-   Fix little issue with array generators, now parse well the index inside, add a test for that
-   Fix string issue with fakerJs
-   Fixed babel polyfill issues
-   updates on dev packages

#### (1.2.2)

-   Better error management
-   Added eval methods
-   Update docs with the online mocker-api: https://mocker-api.herokuapp.com/

#### (1.2.1)

-   Start to parse better the errors

#### (1.2.0)

-   New internal reorganization
-   Added hasOne (related is deprecated) and hasMany
-   **_Breaking Change_**: related config is deprecated, instead of related use hasOne.

#### (1.1.1)

-   Added RandExpJs generator
-   Improve test system (I know im improving it! =P)
-   **_Breaking Change_**: the older versions aren´t compatible with this module, the way to generate the data are changed:
    #### (1.1.0)
-   Added casualJs
-   Added self option
-   Added db option
-   Added related option

#### (1.0.6)

-   Updated chance.js to 1.0

#### (1.0.5)

-   Added the concat option, and the strictConcat on Array generator.

#### (1.0.4)

-   Added on uniqueField two ways to generate the data
-   Starting to add errors

#### (1.0.3)

-   Fix Arrays
-   **_Breaking Change_**: the older versions aren´t compatible with this module, the way to generate the data are changed:

    ```javascript
    var cat = {
        name: {
            values: ['txuri', 'pitxi', 'kitty']
        }
    }
    var m = mocker()
        .schema('cat', cat, 10)
        .schema('cat2', cat, { uniqueField: 'name' })
        .build(function (data) {
            console.log(util.inspect(data, { depth: 10 }))
        })
    ```

#### (0.7.0)

-   **_Breaking Change_**: Added the posibility to enable the pluralize on the output entity. Now if you want to pluralize the output follow the example in the doc, **_by defatult is not anymore pluralized_**.

    Old call configuration:

    ```javascript
    var m = mocker(config)
    m.generate('user', 2)
        .then(m.generate('group', 2))
        .then(m.generate('conditionalField', 2))
        .then(function (data) {
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

    ```javascript
    var m = mocker(config)
    m.generate('user', 2)
        .generate('group', 2)
        .generate('conditionalField', 2)
        .build(function (data) {
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

-   **_Breaking Change_**: Added the posibility to enable the pluralize on the output entity. Now if you want to pluralize the output follow the example in the doc, **_by defatult is not anymore pluralized_**.

#### (0.5.0)

-   **_Breaking Change_**: Break Point with array config. Now is more clear.

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

-   Add virtual fields

#### (0.4.5)

-   Add incrementalId config
-   Some tweaks on dev config to start to use generators on typescript
-   Performance tweaks for large data generation

#### (0.4.1)

-   Show in console the errors. (I will improve this)
-   Add support to chanceJs, exactly like FakerJs (see "Model definition" **_Chance_**)

#### (0.3.0)

-   Fix errors on iteration over nested structures (new improved interator)
-   Added support to call more naturally to FackerJs fields (see "Model definition" **_Faker_**)

#### (0.2.2)

-   Added a pluralization function
-   Fixed a little issue with the roots schemas (now you can do really crazy things, see test/mocker.example.js)
-   Fix errors introduced in 0.2.0

#### (0.1.6)

-   Fix an error: (Clean initial data field)
-   Fix some memory errors adding inmutableJS for the model
-   Add new tests

#### (0.1.1)

-   Real Refractor of the code
-   Add support multi-level schemas
-   Add tests
-   Add travis support

#### (0.0.4)

-   First release i will update soon with tests and more examples, stay tuned!
