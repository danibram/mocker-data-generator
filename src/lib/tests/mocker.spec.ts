import { test } from 'ava'
import { mocker, Mocker, Schema } from '../../'
import { isArray, isObject } from '../utils'



test('Should return an new instance of mocker', async t => {
    t.deepEqual(mocker(), new Mocker())
})

test('Should iterate root level too with fields in models', async t => {
    let length = 1

    let expectedResult = { user: ['firstName'] }
    let user = { static: 'firstName' }

    let db = await mocker()
        .schema('user', user, length)
        .build()

    t.deepEqual(db, expectedResult)
})

test('Virtuals should be eliminated in the final object and can be accesible during generation', async t => {
    let model = {
        exampleVirtual: {
            incrementalId: 0,
            virtual: true
        },

        id: {
            function: function() {
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

    let expectedResult = {
        id: 0,
        deep2: {
            more: {
                field: 'im here'
            }
        }
    }

    let db = await mocker()
        .schema('situation', model, 1)
        .build()

    t.deepEqual(db.situation[0], expectedResult)
})

test('Should iterate over more complex levels (deeper & function used...)', async t => {
    let model = {
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
                            deeper2: {
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

    let expectedResult = {
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
                            deeper2: 'firstName lastName'
                        }
                    }
                }
            }
        }
    }

    let db = await mocker()
        .schema('situation', model, 1)
        .build()

    t.deepEqual(db.situation[0], expectedResult)
})

test('Should work with conditional keys', async t => {
    let conditional = {
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
    let expectedResult = {
        condition: 'a',
        a: 'conditionLinkedToConditionField'
    }

    let db = await mocker()
        .schema('situation', conditional, 1)
        .build()

    t.deepEqual(db.situation[0], expectedResult)

})


test('Should not affect init values to next entity', async t => {
    let length = 10

    let request = {
        type: {
            values: ['kitty', 'pitxi', 'txuri']
        }
    }
    let request2 = {
        type: {
            static: 'staticValue'
        }
    }

    let db = await mocker()
        .schema('request', request, { uniqueField: 'type' })
        .schema('request2', request2, 10)
        .build()

    t.notDeepEqual(db.request, db.request2)
    db.request2.forEach(r2 => {
        db.request.forEach(r => {
            t.notDeepEqual(r2, r)
        })
    })

})

test('Should generate more entities', async t => {
    let length = 10
    let model1 = { request: {
        id: {
            faker: 'random.number'
        },
        title: {
            faker: 'lorem.sentence'
        },
        number: {
            faker: 'random.number'
        }
    } }

    let model2 = { request: {
        id: {
            faker: 'random.number'
        },
        title: {
            faker: 'lorem.sentence'
        },
        number: {
            faker: 'random.number'
        }
    } }

    let data = await mocker()
        .schema('act', model1, length)
        .schema('act2', model2, length)
        .build()

    t.true(Object.keys(data).length === 2)
    t.deepEqual(Object.keys(data), Array('act', 'act2'))
    t.true(data.act.length === length)
    t.true(data.act2.length === length)


    data.act.forEach(d => {
        t.true(Object.keys(d).length === Object.keys(model1).length)
        t.deepEqual(Object.keys(d), Object.keys(model1))
        t.deepEqual(Object.keys(d.request), Object.keys(model1.request))
    })

    data.act2.forEach(d => {
        t.true(Object.keys(d).length === Object.keys(model2).length)
        t.deepEqual(Object.keys(d), Object.keys(model2))
        t.deepEqual(Object.keys(d.request), Object.keys(model2.request))
    })
})

test('Should uniqueField works', async t => {
    let cat = {
        name: ['txuri', 'pitxi', 'kitty']
    }

    let cat2 = {
        name: {
            values: ['txuri', 'pitxi', 'kitty']
        }
    }

    let result = [ { name: 'txuri' }, { name: 'pitxi' }, { name: 'kitty' } ]
    let data = await mocker()
        .schema('cat', cat, {uniqueField: 'name'})
        .schema('cat2', cat2, {uniqueField: 'name'})
        .build()

    t.deepEqual(data.cat, data.cat2)
    t.deepEqual(data.cat, result)
    t.deepEqual(data.cat2, result)
})
/*
test('Should generate correctly with 2 ways of uniqueField', function(done) {
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
        })*/

test('Should be awesome', async t => {
    t.true(true)
})
