import test from 'ava'
import { Mocker, Schema } from '../../'
import { isArray } from '../utils'

const mock = new Mocker()

test('Should load 1 schema', async (t) => {
    t.true(isArray(mock.schemas))
    t.true(mock.schemas.length === 0)
    mock.schema('users', {})
    t.true(isArray(mock.schemas))
    t.true(mock.schemas.length === 1)
    t.true(mock.schemas[0] instanceof Schema)
})
