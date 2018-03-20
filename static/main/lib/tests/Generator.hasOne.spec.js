"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var _1 = require("../../");
var gen = new _1.Generator();
var set1 = [
    {
        id: 0
    },
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    },
    {
        id: 4
    },
    {
        id: 5
    },
    {
        id: 6
    },
    {
        id: 7
    },
    {
        id: 8
    },
    {
        id: 9
    }
];
var set2 = [
    {
        id: {
            id: 0
        }
    },
    {
        id: {
            id: 1
        }
    },
    {
        id: {
            id: 2
        }
    },
    {
        id: {
            id: 3
        }
    },
    {
        id: {
            id: 4
        }
    },
    {
        id: {
            id: 5
        }
    },
    {
        id: {
            id: 6
        }
    },
    {
        id: {
            id: 7
        }
    },
    {
        id: {
            id: 8
        }
    },
    {
        id: {
            id: 9
        }
    }
];
ava_1.test('Should get one of the DB', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = { hello: set1 };
        res = gen.hasOne({ hasOne: 'hello' });
        t.true(set1.indexOf(res) > -1);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get one of the DB, and one field of that entity', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        gen.DB = {
            hello: set1
        };
        res = gen.hasOne({ hasOne: 'hello', get: 'id' });
        t.true(res !== undefined);
        t.true(res !== null);
        t.true(res <= 10);
        t.true(res >= 0);
        return [2 /*return*/];
    });
}); });
ava_1.test('Should get one of the DB, and one field of that entity, more deep', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var res;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gen.DB = {
                    hello: set2
                };
                return [4 /*yield*/, gen.hasOne({ hasOne: 'hello', get: 'id.id' })];
            case 1:
                res = _a.sent();
                t.true(res !== undefined);
                t.true(res !== null);
                t.true(res <= 10);
                t.true(res >= 0);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmhhc09uZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90ZXN0cy9HZW5lcmF0b3IuaGFzT25lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQTBIQTs7O0FBMUhBLDJCQUEwQjtBQUMxQiwyQkFBa0M7QUFHbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFTLEVBQUUsQ0FBQTtBQUUzQixJQUFNLElBQUksR0FBRztJQUNUO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtJQUNEO1FBQ0ksRUFBRSxFQUFFLENBQUM7S0FDUjtDQUNKLENBQUE7QUFFRCxJQUFNLElBQUksR0FBRztJQUNUO1FBQ0ksRUFBRSxFQUFFO1lBQ0EsRUFBRSxFQUFFLENBQUM7U0FDUjtLQUNKO0lBQ0Q7UUFDSSxFQUFFLEVBQUU7WUFDQSxFQUFFLEVBQUUsQ0FBQztTQUNSO0tBQ0o7SUFDRDtRQUNJLEVBQUUsRUFBRTtZQUNBLEVBQUUsRUFBRSxDQUFDO1NBQ1I7S0FDSjtJQUNEO1FBQ0ksRUFBRSxFQUFFO1lBQ0EsRUFBRSxFQUFFLENBQUM7U0FDUjtLQUNKO0lBQ0Q7UUFDSSxFQUFFLEVBQUU7WUFDQSxFQUFFLEVBQUUsQ0FBQztTQUNSO0tBQ0o7SUFDRDtRQUNJLEVBQUUsRUFBRTtZQUNBLEVBQUUsRUFBRSxDQUFDO1NBQ1I7S0FDSjtJQUNEO1FBQ0ksRUFBRSxFQUFFO1lBQ0EsRUFBRSxFQUFFLENBQUM7U0FDUjtLQUNKO0lBQ0Q7UUFDSSxFQUFFLEVBQUU7WUFDQSxFQUFFLEVBQUUsQ0FBQztTQUNSO0tBQ0o7SUFDRDtRQUNJLEVBQUUsRUFBRTtZQUNBLEVBQUUsRUFBRSxDQUFDO1NBQ1I7S0FDSjtJQUNEO1FBQ0ksRUFBRSxFQUFFO1lBQ0EsRUFBRSxFQUFFLENBQUM7U0FDUjtLQUNKO0NBQ0osQ0FBQTtBQUVELFVBQUksQ0FBQywwQkFBMEIsRUFBRSxVQUFNLENBQUM7OztRQUNwQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFBO1FBRXBCLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7OztLQUNqQyxDQUFDLENBQUE7QUFFRixVQUFJLENBQUMsd0RBQXdELEVBQUUsVUFBTSxDQUFDOzs7UUFDbEUsR0FBRyxDQUFDLEVBQUUsR0FBRztZQUNMLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQTtRQUVHLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNwRCxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQTtRQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQTs7O0tBQ25CLENBQUMsQ0FBQTtBQUVGLFVBQUksQ0FBQyxtRUFBbUUsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUM3RSxHQUFHLENBQUMsRUFBRSxHQUFHO29CQUNMLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUE7Z0JBRVMscUJBQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUE7O2dCQUF6RCxHQUFHLEdBQUcsU0FBbUQ7Z0JBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFBO2dCQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQTtnQkFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUE7Z0JBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBOzs7O0tBQ25CLENBQUMsQ0FBQSJ9