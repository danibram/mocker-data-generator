import test from 'ava'
import { Generator } from '../index.js'

const gen = new Generator()

test('Should works', async (t) => {
    let res = gen.static({ static: 'test' })
    t.true(typeof res === 'string')
    t.true(res === 'test')
})
