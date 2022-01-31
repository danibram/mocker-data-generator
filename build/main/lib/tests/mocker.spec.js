"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var __1 = require("../../");
ava_1.default('Should return an new instance of mocker', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        t.deepEqual(__1.default(), new __1.Mocker());
        return [2 /*return*/];
    });
}); });
ava_1.default('Should iterate root level too with fields in models', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var length, expectedResult, user, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                length = 1;
                expectedResult = { user: ['firstName'] };
                user = { static: 'firstName' };
                return [4 /*yield*/, __1.default().schema('user', user, length).build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db, expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Virtuals should be eliminated in the final object and can be accesible during generation', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var model, expectedResult, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                model = {
                    exampleVirtual: {
                        incrementalId: 0,
                        virtual: true
                    },
                    id: {
                        function: function () {
                            return this.object.exampleVirtual;
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
                };
                expectedResult = {
                    id: 0,
                    deep2: {
                        more: {
                            field: 'im here'
                        }
                    }
                };
                return [4 /*yield*/, __1.default().schema('situation', model, 1).build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db.situation[0], expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Should iterate over more complex levels (deeper & function used...)', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var model, expectedResult, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                model = {
                    name: {
                        firstName: {
                            static: 'firstName'
                        },
                        lastName: {
                            static: 'lastName'
                        },
                        much: {
                            deeper: {
                                function: function () {
                                    return (this.object.name.firstName +
                                        ' ' +
                                        this.object.name.lastName);
                                }
                            },
                            more: {
                                deeper: {
                                    function: function () {
                                        return (this.object.name.firstName +
                                            ' ' +
                                            this.object.name.lastName);
                                    }
                                },
                                level: {
                                    deeper: {
                                        function: function () {
                                            return (this.object.name.firstName +
                                                ' ' +
                                                this.object.name.lastName);
                                        }
                                    },
                                    awesome: {
                                        deeper: {
                                            function: function () {
                                                return (this.object.name.firstName +
                                                    ' ' +
                                                    this.object.name.lastName);
                                            }
                                        },
                                        deeper2: {
                                            function: function () {
                                                return (this.object.name.firstName +
                                                    ' ' +
                                                    this.object.name.lastName);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                expectedResult = {
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
                };
                return [4 /*yield*/, __1.default().schema('situation', model, 1).build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db.situation[0], expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Should work with conditional keys', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var conditional, expectedResult, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                conditional = {
                    condition: {
                        static: 'a'
                    },
                    'object.condition==="a",a': {
                        static: 'conditionLinkedToA'
                    },
                    'object.condition==="b",b': {
                        static: 'conditionLinkedToB'
                    }
                };
                expectedResult = {
                    condition: 'a',
                    a: 'conditionLinkedToA'
                };
                return [4 /*yield*/, __1.default().schema('situation', conditional, 1).build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db.situation[0], expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Should work with conditional keys II', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var conditional, user, email, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                conditional = {
                    condition: {
                        faker: 'helpers.randomize(["email", "user"])'
                    },
                    'object.condition==="email",show': {
                        static: 'email'
                    },
                    'object.condition==="user",show': {
                        static: 'user'
                    },
                    'object.condition==="email",email': {
                        hasOne: 'emails'
                    },
                    'object.condition==="user",user': {
                        hasOne: 'users'
                    }
                };
                user = { faker: 'name.findName' };
                email = { faker: 'internet.email' };
                return [4 /*yield*/, __1.default()
                        .schema('users', user, 2)
                        .schema('emails', email, 2)
                        .schema('situation', conditional, 3)
                        .build()];
            case 1:
                db = _a.sent();
                t.true(true);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Should not affect init values to next entity', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var length, request, request2, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                length = 10;
                request = {
                    type: {
                        values: ['kitty', 'pitxi', 'txuri']
                    }
                };
                request2 = {
                    type: {
                        static: 'staticValue'
                    }
                };
                return [4 /*yield*/, __1.default()
                        .schema('request', request, { uniqueField: 'type' })
                        .schema('request2', request2, 10)
                        .build()];
            case 1:
                db = _a.sent();
                t.notDeepEqual(db.request, db.request2);
                db.request2.forEach(function (r2) {
                    db.request.forEach(function (r) {
                        t.notDeepEqual(r2, r);
                    });
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Should generate more entities', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var length, model1, model2, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                length = 10;
                model1 = {
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
                model2 = {
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
                return [4 /*yield*/, __1.default()
                        .schema('act', model1, length)
                        .schema('act2', model2, length)
                        .build()];
            case 1:
                data = _a.sent();
                t.true(Object.keys(data).length === 2);
                t.deepEqual(Object.keys(data), Array('act', 'act2'));
                t.true(data.act.length === length);
                t.true(data.act2.length === length);
                data.act.forEach(function (d) {
                    t.true(Object.keys(d).length === Object.keys(model1).length);
                    t.deepEqual(Object.keys(d), Object.keys(model1));
                    t.deepEqual(Object.keys(d.request), Object.keys(model1.request));
                });
                data.act2.forEach(function (d) {
                    t.true(Object.keys(d).length === Object.keys(model2).length);
                    t.deepEqual(Object.keys(d), Object.keys(model2));
                    t.deepEqual(Object.keys(d.request), Object.keys(model2.request));
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Should uniqueField works', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var cat, cat2, result, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cat = {
                    name: ['txuri', 'pitxi', 'kitty']
                };
                cat2 = {
                    name: ['txuri', 'pitxi', 'kitty']
                };
                result = [{ name: 'txuri' }, { name: 'pitxi' }, { name: 'kitty' }];
                return [4 /*yield*/, __1.default()
                        .schema('cat', cat, { uniqueField: 'name' })
                        .schema('cat2', cat2, { uniqueField: 'name' })
                        .build()];
            case 1:
                data = _a.sent();
                t.deepEqual(data.cat, data.cat2);
                t.deepEqual(data.cat, result);
                t.deepEqual(data.cat2, result);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('Should max works', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var cat, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cat = {
                    name: { values: ['txuri', 'pitxi', 'kitty'] }
                };
                return [4 /*yield*/, __1.default()
                        .schema('cat', cat, { max: 10 })
                        .schema('cat2', cat, { max: 40 })
                        .build()];
            case 1:
                data = _a.sent();
                t.true(data.cat.length <= 10);
                t.true(data.cat2.length <= 40);
                return [2 /*return*/];
        }
    });
}); });
/*
test('Should max and min works', async t => {
    let cat = {
        name: ['txuri', 'pitxi', 'kitty']
    }

    let data = await mocker()
        .schema('cat', cat, { min: 5, max: 10 })
        .schema('cat2', cat, { min: 10, max: 40 })
        .build()

    t.true(data.cat.length <= 10)
    t.true(data.cat.length >= 5)
    t.true(data.cat2.length <= 40)
    t.true(data.cat2.length >= 10)
})

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
ava_1.default('Should be awesome', function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        t.true(true);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=mocker.spec.js.map