var mocker = require('../lib')
var expect = require('chai').expect
var assert = require('chai').assert
var faker = require('faker')
var util = require('util')

var m = mocker()

describe('Mocker: Methods', function() {

    var methods = ['schema', 'build', 'reset', 'restart']
    for (var i = 0; i < methods.length; i++) {
        var method = methods[i]
        it('Should have ' + method, function() {
            expect(m[method])
                .to.be.a('function')
                .to.not.be.null
                .to.not.be.undefined
        })
    }
})

describe('Mocker: Generators (Fields)', function() {
    describe('Generators: Fields options', function() {
        describe('Options: ChanceJs', function() {
            it('Should be "integer"', function(done) {
                try {
                    var res  = m.proccessLeaf({
                        chance: 'integer'
                    })

                    expect(res)
                        .to.be.a('number')
                        .not.to.be.null
                        .to.not.be.undefined
                    done()

                } catch (x) {
                    done(x)
                }
            })

            it('Should be "integer()"', function(done) {
                try {
                    var res = m.proccessLeaf({
                        chance: 'integer()'
                    })
                    expect(res)
                        .to.be.a('number')
                        .not.to.be.null
                        .to.not.be.undefined
                    done()
                } catch (x) {
                    done(x)
                }
            })

            it('Should be "integer({"min": 1, "max": 10})"', function(done) {
                try {
                    var res = m.proccessLeaf({
                        chance: 'integer()'
                    })
                    expect(res)
                        .to.be.a('number')
                        .not.to.be.null
                        .to.not.be.undefined
                    done()
                } catch (x) {
                    done(x)
                }
            })

            it('Should be "street_suffixes()[0]["name"]"', function(done) {
                try {
                    var res = m.proccessLeaf({
                        chance: 'street_suffixes()[0]["name"]'
                    })
                    expect(res)
                        .to.be.a('string')
                        .not.to.be.null
                        .to.not.be.undefined
                    done()

                } catch (x) {
                    done(x)
                }
            })
        })

        describe('Options: FakerJs', function() {
            it('Should be "lorem.words"', function(done) {
                try {
                    var res = m.proccessLeaf({
                        faker: 'lorem.words'
                    })
                    expect(res)
                        .to.be.an('array')
                        .not.to.be.null
                        .to.not.be.undefined
                    expect(res.length)
                        .to.be.a('number')
                        .to.be.equal(3)
                        .to.not.be.null
                        .to.not.be.undefined
                    done()
                } catch (x) {
                    done(x)
                }
            })

            it('Should be "lorem.words()"', function(done) {
                try {
                    var res = m.proccessLeaf({
                        faker: 'lorem.words()'
                    })
                    expect(res)
                        .to.be.an('array')
                        .not.to.be.null
                        .to.not.be.undefined
                    expect(res.length)
                        .to.be.a('number')
                        .to.be.equal(3)
                        .not.to.be.null
                        .to.not.be.undefined
                    done()
                } catch (x) {
                    done(x)
                }
            })

            it('Should be "lorem.words(1)"', function(done) {
                try {
                    var res = m.proccessLeaf({
                        faker: 'lorem.words(1)'
                    })
                    expect(res).to.be.an('array')
                    expect(res.length)
                        .to.be.a('number')
                        .to.be.equal(1)
                        .to.not.be.null
                        .to.not.be.undefined
                    done()
                } catch (x) {
                    done(x)
                }
            })

            it('Should be "random.number({"max": 1})"', function(done) {
                try {
                    var res = m.proccessLeaf({
                        faker: 'random.number({"max": 1})'
                    })
                    expect(res)
                        .to.be.a('number')
                        .to.not.be.null
                        .to.not.be.undefined
                    done()
                } catch (x) {
                    done(x)
                }
            })

            it('Should be "random.number({"min": 1, "max": 2})"', function(done) {
                try {
                    var res = m.proccessLeaf({
                        faker: 'random.number({"min": 1, "max": 2})'
                    })
                    expect(res)
                        .to.be.a('number')
                        .to.not.be.null
                        .to.not.be.undefined
                    done()
                } catch (x) {
                    done(x)
                }
            })

            it('Should be "lorem.words()[0]"', function(done) {
                try {
                    var res = m.proccessLeaf({
                        faker: 'lorem.words()[0]'
                    })
                    expect(res)
                        .to.be.a('string')
                        .to.not.be.null
                        .to.not.be.undefined
                    done()
                } catch (x) {
                    done(x)
                }
            })

            it('Should be "lorem.words(1)[0]"', function(done) {
                try {
                    var res = m.proccessLeaf({
                        faker: 'lorem.words(1)[0]'
                    })
                    expect(res)
                        .to.be.a('string')
                        .to.not.be.null
                        .to.not.be.undefined
                    done()
                } catch (x) {
                    done(x)
                }
            })
        })

        describe('Options: Static', function() {
            it('Should have static opts', function(done) {
                var res = m.proccessLeaf({
                    static: 'test'
                })
                try {
                    expect(res)
                        .to.be.a('string')
                        .to.deep.equal('test')
                        .to.not.be.null
                        .to.not.be.undefined
                    done()
                } catch (x) {
                    done(x)
                }
            })
        })

        describe('Options: IncrementalId', function() {
            var len = 10
            var solution = []
            var user = {
                id: {
                    incrementalId: 0
                }
            }

            for (var i = 0; i < len; i++) {
                solution.push({
                    id: i
                })
            }

            var m = mocker()
            it('Should create incrementalIds', function(done) {
                m.schema('user', user, len)
                    .build(function(data) {
                        try {
                            expect(data.user)
                                .to.be.an('array')
                                .to.deep.equal(solution)
                                .to.not.be.null
                                .to.not.be.undefined
                            done()
                        } catch (x) {
                            done(x)
                        }
                    })
            })

            var len = 10
            var solution = []
            var user = {
                id: {
                    incrementalId: 10
                }
            }

            for (var i = 0; i < len; i++) {
                solution.push({
                    id: i + 10
                })
            }

            var m = mocker()
            it('Should create incrementalIds with an offset', function(done) {
                m.schema('user', user, len)
                    .build(function(str) {
                        try {
                            expect(str.user)
                                .to.be.an('array')
                                .to.deep.equal(solution)
                                .to.not.be.null
                                .to.not.be.undefined
                            done()
                        } catch (x) {
                            done(x)
                        }
                    })
            })
        })

        describe('Options: Function', function() {
            it('Should have funtion opts', function(done) {
                var res = m.proccessLeaf({
                    function() {
                        return 'test'
                    }
                })
                try {
                    expect(res)
                        .to.be.a('string')
                        .to.deep.equal('test')
                        .to.not.be.null
                        .to.not.be.undefined
                    done()
                } catch (x) {
                    done(x)
                }
            })

            it('Should call function and have {db, object, faker} injected', function(done) {
                var _this = m.proccessLeaf({
                    function() {
                        return this
                    }
                })

                try {
                    expect(_this).to.be.an('object')
                    expect(_this.faker).to.deep.equal(faker)
                    assert.property(_this, 'db')
                    assert.property(_this, 'object')
                    assert.property(_this, 'faker')
                    done()
                } catch (x) {
                    done(x)
                }

            })
        })

        describe('Options: Values', function() {
            it('Should have values opts', function(done) {
                var values = ['test', 'this', 'awesome', 'module']
                var res = m.proccessLeaf({
                    values: values
                })

                try {
                    expect(res)
                        .to.be.a('string')
                        .to.not.be.null
                        .to.not.be.undefined
                    assert.ok(values.indexOf(res) > -1)
                    done()
                } catch (x) {
                    done(x)
                }
            })
        })

        describe('Options: Array', function() {
            it('It should recognise static field', function(done) {
                var limit = 10
                var model = 'hello'
                var arr = []
                for (var i = 0; i < limit; i++) {
                    arr.push(model)
                }

                var situation = {
                    sites: [{
                        static: model,
                        length: 10,
                        fixedLength: true
                    }]
                }
                var result = {
                    sites: arr
                }

                var m = mocker()

                var data = m.proccessNode(situation)
                try {
                    expect(data)
                        .to.deep.equal(result)
                        .to.not.be.undefined
                        .to.not.be.null
                        done()
                } catch(e){
                    done(e)
                }

            })

            it('It should recognise functions field', function(done) {
                var limit = 10
                var model = 'hello'
                var arr = []
                for (var i = 0; i < limit; i++) {
                    arr.push(model)
                }

                var situation = {
                    sites: [{
                        function() {
                            return 'hello'
                        },

                        length: 10,
                        fixedLength: true
                    }]
                }
                var result = {
                    sites: arr
                }

                var m = mocker()
                var data = m.proccessNode(situation)
                try {
                    expect(data)
                        .to.deep.equal(result)
                        .to.not.be.undefined
                        .to.not.be.null
                        done()
                } catch(e){
                    done(e)
                }
            })

            it('It should recognise fakerJs field', function(done) {
                var situation = {
                    sites: [{
                        faker: 'lorem.words()[0]',
                        length: 10,
                        fixedLength: false
                    }]
                }

                var data = m.proccessNode(situation)
                try {
                    expect(data.sites)
                        .to.be.an('array')
                        .to.have.length.below(11)
                        .to.not.be.undefined
                        .to.not.be.null
                    for (var i = 0; i < data.sites.length; i++) {
                        expect(data.sites[i])
                            .to.be.a('string')
                            .to.not.be.undefined
                            .to.not.be.null
                    }

                        done()
                } catch(e){
                    done(e)
                }
            })

            it('It should recognise chanceJs field', function(done) {
                var situation = {
                    sites: [{
                        chance: 'integer',
                        length: 10,
                        fixedLength: false
                    }]
                }

                var data = m.proccessNode(situation)
                try {
                    expect(data)
                    expect(data.sites)
                        .to.be.an('array')
                        .to.have.length.below(11)
                        .to.not.be.undefined
                        .to.not.be.null
                    for (var i = 0; i < data.sites.length; i++) {
                        expect(data.sites[i])
                            .to.be.a('number')
                            .to.not.be.undefined
                            .to.not.be.null
                    }

                        done()
                } catch(e){
                    done(e)
                }
            })
        })

        describe('Options: Virtual Fields', function() {
            var situation = {
                exampleVirtual: {
                    incrementalId: 0,
                    virtual: true
                },

                id: {
                    function() {
                        return this.object.exampleVirtual
                    }
                },
                deep: {
                    more: {
                        field: {
                            static: 'im here',
                            virtual: true
                        }
                    }
                },
                deep2: {
                    more: {
                        field: {
                            static: 'im here'
                        }
                    }
                }
            }

            var result = {
                id: 0,
                deep2: {
                    more: {
                        field: 'im here'
                    }
                }
            }

            it('Virtual should be eliminated in the final object', function(done) {
                var m = mocker()
                var data = m.schema('situation', situation, 1)
                    .build(function(data){
                        try {
                            expect(data.situation[0])
                                .to.deep.equal(result)
                                .to.not.be.undefined
                                .to.not.be.null
                            done()
                        } catch(e){
                            done(e)
                        }
                    })
            })
        })
    })

    describe('Generators: Levels', function() {

        it('Should work with conditional keys', function(done) {
            var conditional = {
                condition: {
                    static: 'a'
                },
                'object.condition==="a",a': {
                    static: 'conditionLinkedToConditionField'
                },
                'object.condition==="b",b': {
                    static: 'conditionLinkedToConditionField'
                }
            }
            var expectedResult = {
                condition: 'a',
                a: 'conditionLinkedToConditionField'
            }

            var m = mocker({
                user: conditional
            })
            var data = m.proccessNode(conditional)
            try {
                expect(data)
                    .to.deep.equal(expectedResult)
                    .to.not.be.undefined
                    .to.not.be.null

                done()
            } catch (x) {
                done(x)
            }
        })

        it('Should iterate over more levels', function(done) {
            var userMoreLvl = {
                name: {
                    firstName: {
                        static: 'firstName'
                    },
                    lastName: {
                        static: 'lastName'
                    },
                    much: {
                        more: {
                            level: {
                                awesome: {
                                    deeper: {
                                        static: 'yeah'
                                    }
                                }
                            }
                        }
                    }
                }
            }

            var expectedResult = {
                name: {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    much: {
                        more: {
                            level: {
                                awesome: {
                                    deeper: 'yeah'
                                }
                            }
                        }
                    }
                }
            }

            var m = mocker()
            var data = m.proccessNode(userMoreLvl)

            try {
                expect(data)
                    .to.deep.equal(expectedResult)
                    .to.not.be.undefined
                    .to.not.be.null
                done()
            } catch (x) {
                done(x)
            }
        })

        it('Should iterate over more complex levels (deeper & function used...)', function(done) {
            var userMoreLvl = {
                name: {
                    firstName: {
                        static: 'firstName'
                    },
                    lastName: {
                        static: 'lastName'
                    },
                    much: {
                        deeper: {
                            function() {
                                return this.object.name.firstName + ' ' + this.object.name.lastName
                            }
                        },
                        more: {
                            deeper: {
                                function() {
                                    return this.object.name.firstName + ' ' + this.object.name.lastName
                                }
                            },
                            level: {
                                deeper: {
                                    function() {
                                        return this.object.name.firstName + ' ' + this.object.name.lastName
                                    }
                                },
                                awesome: {
                                    deeper: {
                                        function() {
                                            return this.object.name.firstName + ' ' + this.object.name.lastName
                                        }
                                    },
                                    deeper: {
                                        function() {
                                            return this.object.name.firstName + ' ' + this.object.name.lastName
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            var expectedResult = {
                name: {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    much: {
                        deeper: 'firstName lastName',
                        more: {
                            deeper: 'firstName lastName',
                            level: {
                                deeper: 'firstName lastName',
                                awesome: {
                                    deeper: 'firstName lastName',
                                    deeper: 'firstName lastName'
                                }
                            }
                        }
                    }
                }
            }

            var m = mocker()
            var data = m.proccessNode(userMoreLvl)
            try {
                expect(data)
                    .to.deep.equal(expectedResult)
                    .to.not.be.undefined
                    .to.not.be.null
                done()
            } catch (x) {
                done(x)
            }
        })
    })

    describe('Generators: Entities', function() {
        it('Should generate correctly with uniqueField', function(done) {

            var length = 10

            var request = {
                type: {
                    values: []
                },
                number: {
                    static: 23
                }
            }

            var expectedResult = []
            for (var i = 0; i < length; i++) {
                var w = faker.lorem.words(1)[0]
                request.type.values[i] = w
                expectedResult.push({
                    type: w,
                    number: 23
                })
            }

            var m = mocker()
            m.schema('request', request, { uniqueField: 'type' })
                .build(function(data) {
                    try {
                        expect(data).to.have.property('request')
                        for (var i = 0; i < length; i++) {
                            var r = data.request[i]
                            expect(r).to.have.property('type').not.to.be.null
                            expect(r).to.have.property('number').not.to.be.null
                        }

                        expect(data.request)
                            .to.deep.equal(expectedResult)
                            .to.not.be.undefined
                            .to.not.be.null
                        expect(data.request.length)
                            .to.equal(length)
                            .to.not.be.undefined
                            .to.not.be.null
                        done()
                    } catch (x) {
                        done(x)
                    }
                })

        })

        it('Should not affect init values to next entity', function(done) {
            var length = 10

            var request = {
                type: {
                    values: []
                }
            };
            var request2 = {
                type: {
                    static: 'staticValue'
                }
            }

            for (var i = 0; i < length; i++) {
                var w = faker.lorem.words(1)[0]
                request.type.values.push(w)
            }

            var m = mocker()
            m.schema('request', request, {
                    uniqueField: 'type'
                })
                .schema('request2', request2, 10)
                .build(function(data) {
                    try { // boilerplate to be able to get the assert failures
                        expect(data).to.have.property('request')
                        for (var i = 0; i < length; i++) {
                            var r = data.request[i]
                            expect(r).to.have.property('type').not.to.be.null
                        }

                        expect(data.request.length).to.equal(length)

                        var b = data.request[data.request.length - 1]

                        //expect(a).to.not.equal(b)
                        for (var i = 0; i < data.request2.length; i++) {
                            var a = data.request2[i]
                            expect(a).to.not.deep.equal(b)
                        }

                        done()
                    } catch (x) {
                        done(x)
                    }

                })
        })

        it('Should generate more entities', function(done) {
            var length = 10
            var act = {
                request: {
                    id: {
                        faker: 'random.number'
                    },
                    title: {
                        faker: 'lorem.sentence'
                    },
                    number: {
                        faker: 'random.number'
                    }
                }
            };
            var act2 = {
                request: {
                    id: {
                        faker: 'random.number'
                    },
                    title: {
                        faker: 'lorem.sentence'
                    },
                    number: {
                        faker: 'random.number'
                    }
                }
            }
            var m = mocker()
            m.schema('act', act, length)
                .schema('act2', act2, length)
                .build(function(data) {

                    //expect(data.requests).to.deep.equal(expectedResult)
                    expect(data.act.length).to.equal(length)
                    for (var i = 0; i < length; i++) {
                        var a = data.act[i]
                        expect(a).to.have.property('request')
                        expect(a.request).to.have.property('id').not.to.be.null
                        expect(a.request).to.have.property('title').not.to.be.null
                        expect(a.request).to.have.property('number').not.to.be.null
                    }

                    done()
                })
        })

        it('Should iterate root level too (static)', function(done) {
            var length = 1
            var userMoreLvl = {
                static: 'firstName'
            }

            var expectedResult = {
                user: ['firstName']
            }
            var user = {
                static: 'firstName'
            }
            var m = mocker()

            m.schema('user', user, length)
                .build(function(data) {
                    try {
                        expect(data).to.deep.equal(expectedResult)
                        done()
                    } catch (x) {
                        done(x)
                    }
                })
        })

        it('Should be awesome', function(done) {
            done()
        })
    })
    /*
    describe('General Options: Output name pluralized', function() {
        var length = 1
        var userMoreLvl = {
            static: 'firstName'
        }
        var expectedResultPlural = {
            users: ['firstName']
        }
        var expectedResultSingle = {
            user: ['firstName']
        }
        it('Should generate pluralize entity', function(done) {
            var m = mocker({
                user: userMoreLvl
            }, { pluralizeOutputEntity: true })
            m.generate('user', length)
                .build(function(data) {
                    try {
                        expect(data).to.deep.equal(expectedResultPlural)
                        done()
                    } catch (x) {
                        done(x)
                    }
                })
        })

        it('Should generate single entity', function(done) {
            var m = mocker({
                user: userMoreLvl
            }, { pluralizeOutputEntity: false })
            m.generate('user', length)
                .build(function(data) {
                    try {
                        expect(data).to.deep.equal(expectedResultSingle)
                        done()
                    } catch (x) {
                        done(x)
                    }
                })
        })

        it('Should generate single entity by default', function(done) {
            var m = mocker({
                user: userMoreLvl
            })
            m.generate('user', length)
                .build(function(data) {
                    try {
                        expect(data).to.deep.equal(expectedResultSingle)
                        done()
                    } catch (x) {
                        done(x)
                    }
                })
        })


    })*/
})
