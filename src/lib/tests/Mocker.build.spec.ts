import test from 'ava'
import { Mocker } from '../../'

test('Should build with callback', async (t) => {
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

test('Should produce an error', async (t) => {
    let result = {
        users: [
            {
                hello: 'world'
            }
        ]
    }
    let mock = new Mocker()
    mock.schema('users', { hello: { faker: 'worldrqwerqw' } }, 1)
    await mock.build((error) => {
        t.deepEqual(
            (error as Error).message,
            'Schema: "users" Error: "faker" This faker method doesnt exists \'worldrqwerqw\'.'
        )
    })

    await mock.build().then(
        (data) => data,
        (e) => {
            t.deepEqual(
                e.message,
                'Schema: "users" Error: "faker" This faker method doesnt exists \'worldrqwerqw\'.'
            )
        }
    )
})

test('Should produce an error when pass an string as options', async (t) => {
    const throwedErr =
        'Schema: "users" An string "hey" is not recognized as a parameter.'

    let mock = new Mocker()
    mock.schema('users', { hello: { faker: 'worldrqwerqw' } }, 'hey')

    const error = t.throws(() =>
        mock.build((error) => {
            throw error
        })
    )

    t.is(error.message, throwedErr)

    await mock.build().then(
        (data) => data,
        (e) => {
            t.deepEqual(e.message, throwedErr)
        }
    )
})

test('Should produce an error when uniqueField is not an array', async (t) => {
    const throwedErr =
        'Schema: "users" The posible values value is not an Array'

    let model = {
        name: {
            values: 'a'
        }
    }

    let mock = new Mocker()
    mock.schema('users', model, { uniqueField: 'name' })

    const error = t.throws(() =>
        mock.build((error) => {
            throw error
        })
    )

    t.is(error.message, throwedErr)

    await mock.build().then(
        (data) => data,
        (e) => {
            t.deepEqual(e.message, throwedErr)
        }
    )
})

test('Should produce an error when uniqueField not exists', async (t) => {
    let throwedErr = 'Schema: "users" The field "test" not exists.'

    let model = {
        name: {
            values: ['a', 'b']
        }
    }

    let mock = new Mocker()
    mock.schema('users', model, { uniqueField: 'test' })

    const error = t.throws(() =>
        mock.build((error) => {
            throw error
        })
    )

    t.is(error.message, throwedErr)

    await mock.build().then(
        (data) => data,
        (e) => {
            t.deepEqual(e.message, throwedErr)
        }
    )
})

test('Should build with await (Promised)', async (t) => {
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

test('Should build with Promised old style', async (t) => {
    let result = {
        users: [
            {
                hello: 'world'
            }
        ]
    }
    let mock = new Mocker()

    mock.schema('users', { hello: { static: 'world' } }, 1)
        .build()
        .then((db) => t.deepEqual(db, result))
})
