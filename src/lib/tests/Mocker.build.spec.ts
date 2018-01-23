import { test } from 'ava'
import { Mocker, Schema } from '../../'
import { isArray, isObject } from '../utils'

test('Should build with callback', async t => {
    let result = {
        users: [
            {
                hello: 'world'
            }
        ]
    }
    let mock = new Mocker()
    mock.schema('users', { hello: { static: 'world' } }, 1)
    mock.build((e, db) => t.deepEqual(db, result))
})

test('Should produce an error', async t => {
    let result = {
        users: [
            {
                hello: 'world'
            }
        ]
    }
    let mock = new Mocker()
    mock.schema('users', { hello: { faker: 'worldrqwerqw' } }, 1)
    t.throws(() => mock.build((error) => {
        throw error
    }), 'Schema: "users" Error: "faker" This faker method doesnt exists \'worldrqwerqw\'.')

    await mock.build()
        .then(data => data, e => {
            t.deepEqual(e.message, 'Schema: "users" Error: "faker" This faker method doesnt exists \'worldrqwerqw\'.')
        })
})

test('Should produce an error when pass an string as options', async t => {
    let err = 'Schema: "users" An string "hey" is not recognized as a parameter.'

    let mock = new Mocker()
    mock.schema('users', { hello: { faker: 'worldrqwerqw' } }, 'hey')

    t.throws(() => mock.build((error) => {
        throw error
    }), err)

    await mock.build()
        .then(data => data, e => {
            t.deepEqual(e.message, err)
        })
})

test('Should produce an error when uniqueField is not an array', async t => {
    let err = 'Schema: "users" The posible values value is not an Array'

    let model = {
        name: {
            values: 'a'
        }
    }

    let mock = new Mocker()
    mock.schema('users', model, { uniqueField: 'name' })

    t.throws(() => mock.build((error) => {
        throw error
    }), err)

    await mock.build()
        .then(data => data, e => {
            t.deepEqual(e.message, err)
        })
})

test('Should produce an error when uniqueField not exists', async t => {
    let err = 'Schema: "users" The field "test" not exists.'

    let model = {
        name: {
            values: ['a', 'b']
        }
    }

    let mock = new Mocker()
    mock.schema('users', model, { uniqueField: 'test' })

    t.throws(() => mock.build((error) => {
        throw error
    }), err)

    await mock.build()
        .then(data => data, e => {
            t.deepEqual(e.message, err)
        })
})

test('Should build with await (Promised)', async t => {
    let result = {
        users: [
            {
                hello: 'world'
            }
        ]
    }
    let mock = new Mocker()
    let db = await mock
        .schema('users', { hello: { static: 'world' } }, 1)
        .build()

    t.deepEqual(db, result)
})

test('Should build with Promised old style', async t => {
    let result = {
        users: [
            {
                hello: 'world'
            }
        ]
    }
    let mock = new Mocker()

    mock
        .schema('users', { hello: { static: 'world' } }, 1)
        .build()
        .then(db => t.deepEqual(db, result))
})
