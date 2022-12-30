import test from 'ava'
import { Generator } from '..'

const gen = new Generator()
gen.generators = {}

test('Should have context {object, db, generators}', async (t) => {
    gen.DB = {}
    gen.object = {}

    let ctx = ['object', 'db', 'generators']
    ctx.forEach((c) => {
        let res = gen.eval({ eval: c })
        t.true(res !== undefined)
        t.true(res !== null)
    })
})
