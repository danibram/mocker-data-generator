import { test } from 'ava'
import { Mocker, Schema } from '../../'
import { isArray, isObject } from '../utils'

const mock = new Mocker()

test('Should reset DB', async t => {
    mock.DB = { users: [] }
    t.true(Object.keys(mock.DB).length === 1)
    mock.reset()
    t.true(isObject(mock.DB))
    t.true(Object.keys(mock.DB).length === 0)
})
