import { test } from 'ava'
import { Generator } from '../../'
import { isArray, isObject } from '../utils'

const gen = new Generator()

test('Should works', async t => {
    let res = gen.static({ static: 'test' })
    t.true(typeof res === 'string')
    t.true(res === 'test')
})

/*

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
                            level: {
                                deeper: {
                                    function: function() {
                                        return this.object.name.firstName + ' ' + this.object.name.lastName
                                    }
                                },
                                awesome: {
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
        it('Should generate correctly with 2 ways of uniqueField', function(done) {
            var cat = {
                name: ['txuri', 'pitxi', 'kitty']
            };
            var cat2 = {
                name: {
                    values: ['txuri', 'pitxi', 'kitty']
                }
            };
            var result = [ { name: 'txuri' }, { name: 'pitxi' }, { name: 'kitty' } ]
            var m = mocker()
                .schema('cat', cat, {uniqueField: 'name'})
                .schema('cat2', cat2, {uniqueField: 'name'})
                .build(function(data){
                    try {
                        expect(data.cat)
                            .to.deep.equal(data.cat2)
                            .to.deep.equal(result)
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
