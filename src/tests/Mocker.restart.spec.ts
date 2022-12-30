import test from 'ava'
import { Mocker } from '..'
import { isArray, isObject } from '../lib/utils'

const mock = new Mocker()

test('Should restart schemas and DB', async (t) => {
    mock.DB = { users: [] }
    t.true(Object.keys(mock.DB).length === 1)

    t.true(isArray(mock.schemas))
    t.true(mock.schemas.length === 0)
    mock.schema('users', {})
    t.true(isArray(mock.schemas))
    t.true(mock.schemas.length === 1)
    mock.restart()

    t.true(isObject(mock.DB))
    t.true(Object.keys(mock.DB).length === 0)

    t.true(isArray(mock.schemas))
    t.true(mock.schemas.length === 0)
})
