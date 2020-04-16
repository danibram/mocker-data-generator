import test from 'ava'
import { Generator } from '../../'

const gen = new Generator()

test('Should have access to db', async (t) => {
    gen.DB = { hello: 'world' }

    let res = gen.db({ db: 'hello' })
    t.true(res === 'world')
})

test('[eval] Should have access to db', async (t) => {
    gen.DB = { hello: 'world' }

    let res = gen.db({ db: 'hello', eval: true })
    t.true(res === 'world')
})

test('Should have access to db (.0 syntax)', async (t) => {
    gen.DB = { hello: ['hello', 'world'] }

    let res = gen.db({ db: 'hello.0' })
    t.true(res === 'hello')
})
