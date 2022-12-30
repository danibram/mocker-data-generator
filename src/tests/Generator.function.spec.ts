import test from 'ava'
import * as fakerJS from 'faker'
import { Generator } from '..'
import { isObject } from '../lib/utils'

const gen = new Generator()
gen.object = { generators: { custom: fakerJS } }

test('Normal Function', async (t) => {
    let res = gen.function({
        function: function () {
            return 'test'
        }
    })

    t.true(typeof res === 'string')
    t.true(res === 'test')
})

test('ES6 Function', async (t) => {
    let res = gen.function({
        function: () => 'test'
    })

    t.true(typeof res === 'string')
    t.true(res === 'test')
})

test('Should call function with context', async (t) => {
    let res = gen.function({
        function: function () {
            return this
        }
    })

    t.true(isObject(res))
    let ctx = ['object', 'db', 'generators']
    t.true(isObject(res))
    ctx.forEach((c) => t.true(res.hasOwnProperty(c)))
})
