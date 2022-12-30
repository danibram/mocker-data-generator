import test from 'ava'
import { Chance } from 'chance'
import * as fakerJS from 'faker'
import * as randexp from 'randexp'
import { Generator } from '..'
import { isArray } from '../lib/utils'
const casual = require('casual-browserify')
const chance = new Chance()

const gen = new Generator()

test('Should be "lorem.words"', async (t) => {
    let res = gen.custom({ generator: fakerJS, input: 'lorem.words' })
    t.true(typeof res === 'string')
})

test('Should be "lorem.words()"', async (t) => {
    let res = gen.custom({ generator: fakerJS, input: 'lorem.words()' })
    t.true(typeof res === 'string')
})

test('Should be "lorem.words(1)"', async (t) => {
    let res = gen.custom({ generator: fakerJS, input: 'lorem.words(1)' })
    t.true(typeof res === 'string')
})

test('Should be "datatype.number({"max": 1})"', async (t) => {
    let res = gen.custom({
        generator: fakerJS,
        input: 'datatype.number({"max": 1})'
    })
    t.true(typeof res === 'number')
    t.true(res <= 1)
})

test('Should be "datatype.number({"min": 1, "max": 2})"', async (t) => {
    let res = gen.custom({
        generator: fakerJS,
        input: 'datatype.number({"min": 1, "max": 2})'
    })
    t.true(typeof res === 'number')
    t.true(res <= 2)
    t.true(res >= 1)
})

test('Should be "lorem.words()[0]"', async (t) => {
    let res = gen.custom({ generator: fakerJS, input: 'lorem.words()[0]' })
    t.true(typeof res === 'string')
})

test('Should be "lorem.words(1)[0]""', async (t) => {
    let res = gen.custom({ generator: fakerJS, input: 'lorem.words(1)[0]' })
    t.true(typeof res === 'string')
})

// Casual

test('Should be "country"', async (t) => {
    let res = gen.custom({ generator: casual, input: 'country' })
    t.true(typeof res === 'string')
})

test('[eval] Should be "country"', async (t) => {
    let res = gen.custom({ generator: casual, input: 'country', eval: true })
    t.true(typeof res === 'string')
})

test('Should be "array_of_digits()"', async (t) => {
    let res = gen.custom({ generator: casual, input: 'array_of_digits()' })
    t.true(isArray(res))
    res.forEach((d) => t.true(typeof d === 'number'))
})

test('Should be "array_of_digits(3)"', async (t) => {
    let res = gen.custom({ generator: casual, input: 'array_of_digits(3)' })
    t.true(isArray(res))
    t.true(res.length === 3)
    res.forEach((d) => t.true(typeof d === 'number'))
})

test('Should be "integer(1,2)"', async (t) => {
    let res = gen.custom({ generator: casual, input: 'integer(1,2)' })
    t.true(typeof res === 'number')
    t.true(res <= 2)
    t.true(res >= 1)
})

// Randexp

test('Should be "/hello+ (world|to you)/"', async (t) => {
    let res = gen.custom({
        generator: randexp,
        input: /hello+ (world|to you)/,
        adapter: function (R, input) {
            return new R(input).gen()
        }
    })
    t.true(typeof res === 'string')
})

// Chance

test('Should be an integer', async (t) => {
    let res = gen.custom({ generator: chance, input: 'integer' })
    t.true(typeof res === 'number')
})

test('[eval] Should be an integer', async (t) => {
    let res = gen.custom({ generator: chance, input: 'integer()', eval: true })
    t.true(typeof res === 'number')
})

test('Should be "integer()"', async (t) => {
    let res = gen.custom({ generator: chance, input: 'integer()' })
    t.true(typeof res === 'number')
})

test('Should be "integer({"min": 1, "max": 10})"', async (t) => {
    let res = gen.custom({
        generator: chance,
        input: 'integer({"min": 1, "max": 10})'
    })
    t.true(typeof res === 'number')
    t.true(res <= 10)
    t.true(res >= 1)
})

test('Should be "street_suffixes()[0]["name"]"', async (t) => {
    let res = gen.custom({
        generator: chance,
        input: 'street_suffixes()[0]["name"]'
    })
    t.true(typeof res === 'string')
})
