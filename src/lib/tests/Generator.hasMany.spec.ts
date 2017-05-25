import { test } from 'ava'
import { Generator } from '../../'
import { isArray, isObject } from '../utils'

const gen = new Generator()

test('Should get many from the DB with max', async t => {
    let data = Array.from(new Array(10)).map((el, i) => ({ 'id': i }) )
    gen.DB = { hello: data }

    let res = gen.hasMany({
        hasMany: 'hello',
        max: 2
    })

    res.forEach(r => t.true(data.indexOf(r) > -1) )
    t.true(res.length <= 2)
    t.true(res.length >= 1)
})

test('Should get many from the DB with min', async t => {
    let data = Array.from(new Array(10)).map((el, i) => ({ 'id': i }) )
    gen.DB = { hello: data }

    let res = gen.hasMany({
        hasMany: 'hello',
        max: 10,
        min: 4
    })

    res.forEach(r => t.true(data.indexOf(r) > -1) )
    t.true(res.length <= 10)
    t.true(res.length >= 4)
})

test('Should get many from the DB with fixed amount', async t => {
    let data = Array.from(new Array(10)).map((el, i) => ({ 'id': i }) )
    gen.DB = { hello: data }

    let res = gen.hasMany({
        hasMany: 'hello',
        amount: 5
    })

    res.forEach(r => t.true(data.indexOf(r) > -1) )
    t.true(res.length === 5)
})

test('Should get many from the DB, and one field of each entity', async t => {
    let data = Array.from(new Array(10)).map((el, i) => ({ 'id': i }) )
    gen.DB = { hello: data }

    let res = gen.hasMany({
        hasMany: 'hello',
        get: 'id',
        amount: 1

    })

    t.true(typeof res[0] === 'number')
})
