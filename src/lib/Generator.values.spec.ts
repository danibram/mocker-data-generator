import { test } from 'ava'
import { Generator } from '../'
import { isArray, isObject } from './utils'

const gen = new Generator()

test('Should works', async t => {
    let values = ['test', 'this', 'awesome', 'module']
    let res = gen.values({ values })
    t.true(typeof res === 'string')
    t.true(values.indexOf(res) > -1)
})
