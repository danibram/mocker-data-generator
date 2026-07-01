import test from 'ava'
import { Schema } from '../index.js'

let schema = new Schema('test', {}, {})

test('Array: It should recognise static field', async (t) => {
    schema.buildSingle({ static: 'hello' })
    t.true(schema.object === 'hello')
})
