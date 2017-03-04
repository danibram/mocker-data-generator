import { test } from 'ava'
import { Schema } from '../../'
import { isArray, isObject } from '../utils'

let schema = new Schema('test', {}, {})

test('Array: It should recognise static field', async t => {
    schema.buildSingle({ static: 'hello'})
    t.true(schema.object === 'hello')
})

