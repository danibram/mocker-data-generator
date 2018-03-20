"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
ava_1.test('Should return an new instance of mocker', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        t.deepEqual(_1.default(), new _1.Mocker());
        return [2 /*return*/];
    });
}); });
ava_1.test('Should iterate root level too with fields in models', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var length, expectedResult, user, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                length = 1;
                expectedResult = { user: ['firstName'] };
                user = { static: 'firstName' };
                return [4 /*yield*/, _1.default()
                        .schema('user', user, length)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db, expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Virtuals should be eliminated in the final object and can be accesible during generation', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                return [4 /*yield*/, _1.default()
                        .schema('situation', model, 1)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db.situation[0], expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should iterate over more complex levels (deeper & function used...)', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                return [4 /*yield*/, _1.default()
                        .schema('situation', model, 1)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db.situation[0], expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should work with conditional keys', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var conditional, expectedResult, db;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                conditional = {
                    condition: {
                        static: 'a'
                    },
                    'object.condition==="a",a': {
                        static: 'conditionLinkedToConditionField'
                    },
                    'object.condition==="b",b': {
                        static: 'conditionLinkedToConditionField'
                    }
                };
                expectedResult = {
                    condition: 'a',
                    a: 'conditionLinkedToConditionField'
                };
                return [4 /*yield*/, _1.default()
                        .schema('situation', conditional, 1)
                        .build()];
            case 1:
                db = _a.sent();
                t.deepEqual(db.situation[0], expectedResult);
                return [2 /*return*/];
        }
    });
}); });
ava_1.test('Should not affect init values to next entity', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                return [4 /*yield*/, _1.default()
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
ava_1.test('Should generate more entities', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                return [4 /*yield*/, _1.default()
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
ava_1.test('Should uniqueField works', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var cat, cat2, result, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cat = {
                    name: ['txuri', 'pitxi', 'kitty']
                };
                cat2 = {
                    name: {
                        values: ['txuri', 'pitxi', 'kitty']
                    }
                };
                result = [{ name: 'txuri' }, { name: 'pitxi' }, { name: 'kitty' }];
                return [4 /*yield*/, _1.default()
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
ava_1.test('Should max works', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var cat, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cat = {
                    name: ['txuri', 'pitxi', 'kitty']
                };
                return [4 /*yield*/, _1.default()
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
ava_1.test('Should max and min works', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var cat, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cat = {
                    name: ['txuri', 'pitxi', 'kitty']
                };
                return [4 /*yield*/, _1.default()
                        .schema('cat', cat, { min: 5, max: 10 })
                        .schema('cat2', cat, { min: 10, max: 40 })
                        .build()];
            case 1:
                data = _a.sent();
                t.true(data.cat.length <= 10);
                t.true(data.cat.length >= 5);
                t.true(data.cat2.length <= 40);
                t.true(data.cat2.length >= 10);
                return [2 /*return*/];
        }
    });
}); });
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
ava_1.test('Should be awesome', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        t.true(true);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja2VyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Rlc3RzL21vY2tlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkF5VkE7OztBQXpWQSwyQkFBMEI7QUFDMUIsMkJBQStDO0FBRy9DLFVBQUksQ0FBQyx5Q0FBeUMsRUFBRSxVQUFNLENBQUM7O1FBQ25ELENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBTSxFQUFFLEVBQUUsSUFBSSxTQUFNLEVBQUUsQ0FBQyxDQUFBOzs7S0FDdEMsQ0FBQyxDQUFBO0FBRUYsVUFBSSxDQUFDLHFEQUFxRCxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQzNELE1BQU0sR0FBRyxDQUFDLENBQUE7Z0JBRVYsY0FBYyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQTtnQkFDeEMsSUFBSSxHQUFHLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFBO2dCQUV6QixxQkFBTSxVQUFNLEVBQUU7eUJBQ2xCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQzt5QkFDNUIsS0FBSyxFQUFFLEVBQUE7O2dCQUZSLEVBQUUsR0FBRyxTQUVHO2dCQUVaLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFBOzs7O0tBQ2xDLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQywwRkFBMEYsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNoRyxLQUFLLEdBQUc7b0JBQ1IsY0FBYyxFQUFFO3dCQUNaLGFBQWEsRUFBRSxDQUFDO3dCQUNoQixPQUFPLEVBQUUsSUFBSTtxQkFDaEI7b0JBRUQsRUFBRSxFQUFFO3dCQUNBLFFBQVEsRUFBRTs0QkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUE7d0JBQ3JDLENBQUM7cUJBQ0o7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGLElBQUksRUFB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