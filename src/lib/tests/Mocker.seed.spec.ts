import test from 'ava'
import mocker, { Mocker } from '../../'

const cats = [
    {
        name: 'Luke'
    },
    {
        name: 'Leia'
    }
]

const mock = new Mocker()

test('Should seed data', async (t) => {
    t.true(Object.keys(mock.DB).length === 0)
    mock.seed('cats', cats)
    t.true(Object.keys(mock.DB).length > 0)
    t.deepEqual(mock.DB.cats, cats)
})

test('Should merge data from seed', async (t) => {
    const mock = await mocker()
        .seed('cats', cats)
        .schema(
            'cats',
            {
                name: {
                    values: ['txuri', 'pitxi', 'kitty']
                }
            },
            1
        )
        .build()

    console.log(mock)

    t.true(mock.cats.length === 3)
})
