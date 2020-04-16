import test from 'ava'
import { Generator } from '../../'

const gen = new Generator()

gen.name = 'user'
gen.DB = { user: [{ id: 0 }, { id: 1 }, { id: 2 }] }

test('Incremental Id true', async (t) => {
    /*let values = ['test', 'this', 'awesome', 'module']
    t.true(typeof res === 'string')
    t.true(values.indexOf(res) > -1)
    let length = 10
    let solution = Array.from(new Array(length)).map((el, i) => ({ 'id': i }) )*/

    let res = gen.incrementalId({ incrementalId: true })
    t.true(res === 3)
})

test('Incremental Id default value', async (t) => {
    let res = gen.incrementalId({ incrementalId: '2' })
    t.true(res === 5)
    res = gen.incrementalId({ incrementalId: '9' })
    t.true(res === 12)
})
