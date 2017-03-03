import { test } from 'ava'
import { Generator } from '../../'
import { isArray, isObject } from '../utils'

const gen = new Generator()

test('Should get one of the DB', async t => {
    let data = Array.from(new Array(10)).map((el, i) => ({ 'id': i }) )
    gen.DB = { hello: data }

    let res = gen.hasOne({ hasOne: 'hello' })
    t.true(data.indexOf(res) > -1)
})

test('Should get one of the DB, and one field of that entity', async t => {
    let data = Array.from(new Array(10)).map((el, i) => ({ 'id': i }) )
    gen.DB = { hello: data }

    let res = gen.hasOne({ hasOne: 'hello', get: 'id' })
    t.true(res !== undefined)
    t.true(res !== null)
    t.true(res <= 10)
    t.true(res >= 0)
})
