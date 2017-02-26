import { test } from 'ava'
import { Generator } from '../'
import { isArray, isObject } from './utils'

const gen = new Generator()

test('Should have access to object', async t => {
    gen.object = { hello: 'world'}

    let res = gen.self({ self: 'hello' })
    t.true(res === 'world')
})
