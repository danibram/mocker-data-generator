import { test } from 'ava'
import { Generator } from '../../'
import { isArray, isObject } from '../utils'

const gen = new Generator()

test('Should be "country"', async t => {
    let res = gen.chance({ chance: 'integer' })
    t.true(typeof res === 'number')
})

test('Should be "integer()"', async t => {
    let res = gen.chance({ chance: 'integer()' })
    t.true(typeof res === 'number')
})

test('Should be "integer({"min": 1, "max": 10})"', async t => {
    let res = gen.chance({ chance: 'integer({"min": 1, "max": 10})' })
    t.true(typeof res === 'number')
    t.true(res <= 10)
    t.true(res >= 1)
})

test('Should be "street_suffixes()[0]["name"]"', async t => {
    let res = gen.chance({ chance: 'street_suffixes()[0]["name"]' })
    t.true(typeof res === 'string')
})
