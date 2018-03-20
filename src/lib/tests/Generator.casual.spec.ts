import { test } from 'ava'
import { Generator } from '../../'
import { isArray, isObject } from '../utils'

const gen = new Generator()

test('Should be "country"', async t => {
    let res = gen.casual({ casual: 'country' })
    t.true(typeof res === 'string')
})

test('Should be "country"', async t => {
    let res = gen.casual({ casual: 'country', eval: true })
    t.true(typeof res === 'string')
})

test('Should be "array_of_digits()"', async t => {
    let res = gen.casual({ casual: 'array_of_digits()' })
    t.true(isArray(res))
    res.forEach(d => t.true(typeof d === 'number'))
})

test('Should be "array_of_digits(3)"', async t => {
    let res = gen.casual({ casual: 'array_of_digits(3)' })
    t.true(isArray(res))
    t.true(res.length === 3)
    res.forEach(d => t.true(typeof d === 'number'))
})

test('Should be "integer(1,2)"', async t => {
    let res = gen.casual({ casual: 'integer(1,2)' })
    t.true(typeof res === 'number')
    t.true(res <= 2)
    t.true(res >= 1)
})
