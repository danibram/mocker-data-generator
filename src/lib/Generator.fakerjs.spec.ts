import { test } from 'ava'
import { Generator } from '../'

const gen = new Generator()

test('Should be "lorem.words"', async t => {
    let res = gen.faker({ faker: 'lorem.words' })
    t.true(typeof res === 'string')
})

test('Should be "lorem.words()"', async t => {
    let res = gen.faker({ faker: 'lorem.words()' })
    t.true(typeof res === 'string')
})

test('Should be "lorem.words(1)"', async t => {
    let res = gen.faker({ faker: 'lorem.words(1)' })
    t.true(typeof res === 'string')
})

test('Should be "random.number({"max": 1})"', async t => {
    let res = gen.faker({ faker: 'random.number({"max": 1})' })
    t.true(typeof res === 'number')
    t.true(res <= 1)
})

test('Should be "random.number({"min": 1, "max": 2})"', async t => {
    let res = gen.faker({ faker: 'random.number({"min": 1, "max": 2})' })
    t.true(typeof res === 'number')
    t.true(res <= 2)
    t.true(res >= 1)
})

test('Should be "lorem.words()[0]"', async t => {
    let res = gen.faker({ faker: 'lorem.words()[0]' })
    t.true(typeof res === 'string')
})

test('Should be "lorem.words(1)[0]""', async t => {
    let res = gen.faker({ faker: 'lorem.words(1)[0]' })
    t.true(typeof res === 'string')
})
