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
    }), 'Schema: "users" Error: Error: "faker" TypeError: faker.worldrqwerqw is not a function')

    await mock.build()
        .then(data => data, e => {
            t.deepEqual(e.message, 'Schema: "users" Error: Error: "faker" TypeError: faker.worldrqwerqw is not a function')
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
