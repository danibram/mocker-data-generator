import test from 'ava'
import { Generator } from '../../'

const gen = new Generator()

const set1 = [
    {
        id: 0
    },
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    },
    {
        id: 4
    },
    {
        id: 5
    },
    {
        id: 6
    },
    {
        id: 7
    },
    {
        id: 8
    },
    {
        id: 9
    }
]

const set2 = [
    {
        id: {
            id: 0
        }
    },
    {
        id: {
            id: 1
        }
    },
    {
        id: {
            id: 2
        }
    },
    {
        id: {
            id: 3
        }
    },
    {
        id: {
            id: 4
        }
    },
    {
        id: {
            id: 5
        }
    },
    {
        id: {
            id: 6
        }
    },
    {
        id: {
            id: 7
        }
    },
    {
        id: {
            id: 8
        }
    },
    {
        id: {
            id: 9
        }
    }
]

test('Should get one of the DB', async (t) => {
    gen.DB = { hello: set1 }

    let res = gen.hasOne({ hasOne: 'hello' })
    t.true(set1.indexOf(res as any) > -1)
})

test('Should get one of the DB, and one field of that entity (eval)', async (t) => {
    gen.DB = {
        hello: set1
    }

    let res = gen.hasOne({ hasOne: 'hello', get: 'id', eval: true })
    t.true(res !== undefined)
    t.true(res !== null)
    t.true(res === 0 || (res && res <= 10))
    t.true(res === 0 || (res && res >= 0))
})

test('Should get one of the DB, and one field of that entity (no-eval)', async (t) => {
    gen.DB = {
        hello: set1
    }

    let res = gen.hasOne({ hasOne: 'hello', get: 'id' })
    t.true(res !== undefined)
    t.true(res !== null)
    t.true(res === 0 || (res && res <= 10))
    t.true(res === 0 || (res && res >= 0))
})

test('Should get one of the DB, and one field of that entity, more deep', async (t) => {
    gen.DB = {
        hello: set2
    }

    let res = await gen.hasOne({ hasOne: 'hello', get: 'id.id' })
    t.true(res !== undefined)
    t.true(res !== null)
    t.true(res === 0 || (res && res <= 10))
    t.true(res === 0 || (res && res >= 0))
})
