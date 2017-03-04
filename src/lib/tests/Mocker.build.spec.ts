import { test } from 'ava'
import { Mocker, Schema } from '../../'
import { isArray, isObject } from '../utils'

test('Should build with callback', async t => {
    let result = {
        users: [{
            hello: 'world'
        }]
    }
    let mock = new Mocker()
    mock.schema('users', { hello: { static: 'world' } }, 1)
    mock.build(db => t.deepEqual(db, result))
})

test('Should build with await (Promised)', async t => {
    let result = {
        users: [{
            hello: 'world'
        }]
    }
    let mock = new Mocker()
    let db = await mock
        .schema('users', { hello: { static: 'world' } }, 1)
        .build()

    t.deepEqual(db, result)
})

test('Should build with Promised old style', async t => {
    let result = {
        users: [{
            hello: 'world'
        }]
    }
    let mock = new Mocker()

    mock
        .schema('users', { hello: { static: 'world' } }, 1)
        .build()
        .then(db => t.deepEqual(db, result))
})
