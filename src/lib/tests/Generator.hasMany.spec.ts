import { test } from 'ava'
import { Generator } from '../../'

const gen = new Generator()

test('Should get many from the DB with max', async t => {
    let data = Array.from(new Array(10)).map((el, i) => ({ id: i }))
    gen.DB = { hello: data }

    let res = gen.hasMany({
        hasMany: 'hello',
        max: 2
    })

    res.forEach(r => t.true(data.indexOf(r as any) > -1))
    t.true(res.length <= 2)
    t.true(res.length >= 1)
})

test('Should get many from the DB with min', async t => {
    let data = Array.from(new Array(10)).map((el, i) => ({ id: i }))
    gen.DB = { hello: data }

    let res = gen.hasMany({
        hasMany: 'hello',
        max: 10,
        min: 4
    })

    res.forEach(r => t.true(data.indexOf(r as any) > -1))
    t.true(res.length <= 10)
    t.true(res.length >= 4)
})

test('Should get many from the DB with min = 0', async t => {
    let data = Array.from(new Array(10)).map((el, i) => ({ id: i }))
    gen.DB = { hello: data }

    let res = gen.hasMany({
        hasMany: 'hello',
        max: 1,
        min: 0
    })

    res.forEach(r => t.true(data.indexOf(r as any) > -1))
    t.true(res.length <= 1)
    t.true(res.length >= 0)
})

test('Should get many from the DB with fixed amount', async t => {
    let data = Array.from(new Array(10)).map((el, i) => ({ id: i }))
    gen.DB = { hello: data }

    let res = gen.hasMany({
        hasMany: 'hello',
        amount: 5
    })

    res.forEach(r => t.true(data.indexOf(r as any) > -1))
    t.true(res.length === 5)
})

test('Should get many from the DB, and one field of each entity', async t => {
    let data = Array.from(new Array(10)).map((el, i) => ({ id: i }))
    gen.DB = { hello: data }

    let res = gen.hasMany({
        hasMany: 'hello',
        get: 'id',
        amount: 1
    })

    t.true(typeof res[0] === 'number')
})

test('Should get many from the DB, unique', async t => {
    let data = Array.from(new Array(2)).map((el, i) => ({ id: i }))
    gen.DB = { hello: data }

    let res = gen.hasMany({
        hasMany: 'hello',
        get: 'id',
        amount: 2,
        unique: true
    })

    t.deepEqual(res, [0, 1])
})

test('Should throw an error, not enough unique data', async t => {
    let data = Array.from(new Array(2)).map((el, i) => ({ id: i }))
    gen.DB = { hello: data }

    try {
        let res = gen.hasMany({
            hasMany: 'hello',
            get: 'id',
            amount: 3,
            unique: true
        })
    } catch (e) {
        t.deepEqual(
            e,
            'Can´t get unique data. Source "hello" has not enough data'
        )
    }
})
