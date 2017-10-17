import { test } from 'ava'
import { Generator } from '../../'
import { isArray, isObject } from '../utils'

const gen = new Generator()

test('Should have access to db', async t => {
    gen.DB = { hello: 'world' }

    let res = gen.db({ db: 'hello' })
    t.true(res === 'world')
})
