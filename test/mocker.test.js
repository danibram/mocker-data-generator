var mocker    = require('../build/mocker.js')
var expect    = require('chai').expect
var assert    = require('chai').assert
var faker     = require('faker')

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
        conf = m.config
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
                m.generateField({faker: 'name.findName'}, function(str) {
                    expect(str).to.be.a('string')
                    m.generateField({faker: 'random.number'}, function(number) {
                        expect(number).to.be.a('number')
                        done()
                    })
                })
            })
        })

        describe('Options: Static', function() {
            it('Should have static opts', function(done) {
                m.generateField({static: 'test'}, function(str) {
                    expect(str).to.be.a('string')
                    expect(str).to.deep.equal('test')
                    done()
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
                    expect(str).to.be.a('string')
                    expect(str).to.deep.equal('test')
                    done()
                })
            })

            it('Should call function and have {db, object, faker} injected', function(done) {
                m.generateField({
                    function: function() {
                        return this
                    }
                }, function(_this) {
                    expect(_this).to.be.an('object')
                    expect(_this.faker).to.deep.equal(faker)
                    assert.property(_this, 'db')
                    assert.property(_this, 'object')
                    assert.property(_this, 'faker')
                    done()
                })

            })
        })

        describe('Options: Values', function() {
            it('Should have values opts', function(done) {
                var values = ['test', 'this', 'awesome', 'module']
                m.generateField({
                    values: values
                }, function(str) {
                    expect(str).to.be.a('string')
                    assert.ok(values.indexOf(str) > -1)
                    done()
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
                expect(data).to.deep.equal(expectedResult)
                done()
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
                expect(data).to.deep.equal(expectedResult)
                done()
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
                    expect(data).to.deep.equal(expectedResult)
                    done()
                })
        })
    })

    describe('Generators: Entities', function() {
        it('Should generate prefixed valued data', function(done) {
            var length = 10
            var request = {
                type: {
                    values: []
                }
            }
            var expectedResult = []

            for (var i = 0; i < length; i++) {
                var w = faker.lorem.words(1)[0]
                request.type.values.push(w)
                expectedResult.push({type: w})
            }

            var m = mocker({request: request})
            m.generate('request', {uniqueField: 'type'})
                .then(function(data) {
                    expect(data.requests).to.deep.equal(expectedResult)
                    expect(data.requests.length).to.equal(length)
                    done()
                })
        })
    })
})
