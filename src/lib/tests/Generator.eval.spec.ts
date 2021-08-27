import test from 'ava'
import { Generator } from '../../'

const gen = new Generator()

test('Should have context {object, db, faker, chance, casual, randexp}', async (t) => {
    gen.DB = {}
    gen.object = {}

    let ctx = ['object', 'db', 'faker', 'chance', 'casual', 'randexp']
    ctx.forEach((c) => {
        let res = gen.eval({ eval: c })
        t.true(res !== undefined)
        t.true(res !== null)
    })
})
