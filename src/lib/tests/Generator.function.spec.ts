import test from 'ava'
import { Generator } from '../../'
import { isObject } from '../utils'

const gen = new Generator()

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
    let ctx = ['object', 'db', 'faker', 'chance', 'casual', 'randexp']
    t.true(isObject(res))
    ctx.forEach((c) => t.true(res.hasOwnProperty(c)))
})
