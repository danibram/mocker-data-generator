import { test } from 'ava'
import { Generator } from '../'
import { expect, assert } from 'chai'

const gen = new Generator()

test('Should be "/hello+ (world|to you)/"', async t => {
    let res = gen.randexp({ randexp: /hello+ (world|to you)/ })
    t.true(typeof res === 'string')
})
