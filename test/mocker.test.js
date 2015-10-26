var mocker    = require('../build/mocker.js')
var expect    = require('chai').expect
var assert    = require('chai').assert
var faker     = require('faker')
var util     = require('util')

var config = {
    user:{
        test:{
            faker: 'random.number'
        }
    }
}
var m = mocker(config)

describe('Mocker: Basic', function() {
    it('Should load config correctly', function() {
        conf = m.config.toJS()
        expect(conf).to.deep.equal(config)
    })

    it('Should not have init data', function() {
        data = m.data
        expect(data).to.deep.equal({})
    })
})

describe('Mocker: Methods', function() {

    var methods = ['generate','generateEntity','generateArrayField','generateField']
    for (var i = 0; i < methods.length; i++) {
        var method = methods[i]
        it('Should have ' + method, function() {
            expect(m[method]).to.be.a('function')
        })
    }
})

describe('Mocker: Generators (Fields)', function() {
    describe('Generators: Fields options', function() {
        describe('Options: Faker', function() {
            it('Should have faker opts (have access to faker api)', function(done) {
                try {
                    m.generateField({faker: 'name.findName'}, function(str) {
                        expect(str).to.be.a('string')
                        m.generateField({faker: 'random.number'}, function(number) {
                            expect(number).to.be.a('number')
                            done()
                        })
                    })
                } catch (x) {
                    done(x)
                }
            })
        })

        describe('Options: Static', function() {
            it('Should have static opts', function(done) {
                m.generateField({static: 'test'}, function(str) {
                    try {
                        expect(str).to.be.a('string')
                        expect(str).to.deep.equal('test')
                        done()
                    } catch (x) {
                        done(x)
                    }
                })
            })
        })

        describe('Options: Function', function() {
            it('Should have funtion opts', function(done) {
                m.generateField({
                    function: function() {
                        return 'test'
                    }
                }, function(str) {

                    try {
                        expect(str).to.be.a('string')
                        expect(str).to.deep.equal('test')
                        done()
                    } catch (x) {
                        done(x)
                    }
                })
            })

            it('Should call function and have {db, object, faker} injected', function(done) {
                m.generateField({
                    function: function() {
                        return this
                    }
                }, function(_this) {

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
        })

        describe('Options: Values', function() {
            it('Should have values opts', function(done) {
                var values = ['test', 'this', 'awesome', 'module']
                m.generateField({
                    values: values
                }, function(str) {

                    try {
                        expect(str).to.be.a('string')
                        assert.ok(values.indexOf(str) > -1)
                        done()
                    } catch (x) {
                        done(x)
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
                'object.condition==="a",a':{
                    static: 'conditionLinkedToConditionField'
                },
                'object.condition==="b",b':{
                    static: 'conditionLinkedToConditionField'
                }
            }
            var expectedResult = {
                condition: 'a',
                a: 'conditionLinkedToConditionField'
            }

            var m = mocker({user: conditional})
            m.generateEntity(conditional, function(data) {
                try {
                    expect(data).to.deep.equal(expectedResult)
                    done()
                } catch (x) {
                    done(x)
                }
            })
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
                    much:{
                        more: {
                            level:{
                                awesome:{
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
                    much:{
                        more: {
                            level:{
                                awesome:{
                                    deeper: 'yeah'
                                }
                            }
                        }
                    }
                }
            }

            var m = mocker({user: userMoreLvl})
            m.generateEntity(userMoreLvl, function(data) {
                try {
                    expect(data).to.deep.equal(expectedResult)
                    done()
                } catch (x) {
                    done(x)
                }
            })
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
                    much:{
                        deeper: {
                            function: function() {
                                return this.object.name.firstName + ' ' + this.object.name.lastName
                            }
                        },
                        more: {
                            deeper: {
                                function: function() {
                                    return this.object.name.firstName + ' ' + this.object.name.lastName
                                }
                            },
                            level:{
                                deeper: {
                                    function: function() {
                                        return this.object.name.firstName + ' ' + this.object.name.lastName
                                    }
                                },
                                awesome:{
                                    deeper: {
                                        function: function() {
                                            return this.object.name.firstName + ' ' + this.object.name.lastName
                                        }
                                    },
                                    deeper: {
                                        function: function() {
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
                    much:{
                        deeper: 'firstName lastName',
                        more: {
                            deeper: 'firstName lastName',
                            level:{
                                deeper: 'firstName lastName',
                                awesome:{
                                    deeper: 'firstName lastName',
                                    deeper: 'firstName lastName'
                                }
                            }
                        }
                    }
                }
            }

            var m = mocker({user: userMoreLvl})
            m.generateEntity(userMoreLvl, function(data) {
                try {
                    expect(data).to.deep.equal(expectedResult)
                    done()
                } catch (x) {
                    done(x)
                }
            })
        })
    })

    describe('Generators: Entities', function() {
        it('Should generate prefixed valued data', function(done) {

            var length = 10

            var scheemas = {
                    request: {
                        type: {
                            values: []
                        }
                    }
                }
            var expectedResult = []

            for (var i = 0; i < length; i++) {
                var w = faker.lorem.words(1)[0]
                scheemas.request.type.values.push(w)
                expectedResult.push({type: w})
            }

            var m = mocker(scheemas)
            m.generate('request', {uniqueField: 'type'})
                    .then(function(data) {
                        try {
                            expect(data.requests).to.deep.equal(expectedResult)
                            expect(data.requests.length).to.equal(length)
                            done()
                        } catch (x) {
                            done(x)
                        }
                    })

        })

        it('Should not affect init values to next entity', function(done) {
            var length = 10

            var scheemas = {
                request: {
                    type: {
                        values: []
                    }
                },
                request2: {
                    type:{
                        static: 'staticValue'
                    }
                }
            }
            var expectedResult = []

            for (var i = 0; i < length; i++) {
                var w = faker.lorem.words(1)[0]
                scheemas.request.type.values.push(w)
                expectedResult.push({type: w})
            }

            var m = mocker(scheemas)
            m.generate('request', {uniqueField: 'type'})
                .then(m.generate('request2', 10))
                .then(function(data) {

                    try { // boilerplate to be able to get the assert failures
                        expect(data.requests).to.deep.equal(expectedResult)
                        expect(data.requests.length).to.equal(length)

                        var b = data.requests[data.requests.length - 1]

                        //expect(a).to.not.equal(b)
                        for (var i = 0; i < data.request2s.length; i++) {
                            var a = data.request2s[i]
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
            var model = {
                request:{
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

            var m = mocker({ act: model})
            m.generate('act', length)
            .then(function(data) {
                //expect(data.requests).to.deep.equal(expectedResult)
                expect(data.acts.length).to.equal(length)
                for (var i = 0; i < length; i++) {
                    var a = data.acts[i]
                    expect(a).to.have.property('request')
                    expect(a.request).to.have.property('id').not.to.be.null
                    expect(a.request).to.have.property('title').not.to.be.null
                    expect(a.request).to.have.property('number').not.to.be.null
                }

                done()
            })
        })

        it('Should be awesome', function(done) {
            done()
        })
    })
})
