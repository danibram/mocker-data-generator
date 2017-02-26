import { test } from 'ava'
import * as lib from './'

test('functions can be used without es imports', (t) => {
    t.true(typeof lib.mocker === 'function')
    t.true(typeof lib.Mocker === 'function')
    t.true(typeof lib.Generator === 'function')
    t.true(typeof lib.Schema === 'function')
})

test('Mocker: exists all methods', (t) => {
    let m = lib.mocker()

    let methods = ['schema', 'build', 'reset', 'restart']
    methods.forEach(method => t.true(typeof m[method] === 'function'))
})
