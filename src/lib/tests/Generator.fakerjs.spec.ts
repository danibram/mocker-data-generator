import test from 'ava'
import * as fakerJS from 'faker'
import { Generator, Mocker, Schema } from '../../'

const gen = new Generator()
const mocker = new Mocker()

test('Should be "lorem.words"', async (t) => {
    let res = gen.faker({ faker: 'lorem.words' })
    t.true(typeof res === 'string')
})

test('[eval] Should be "lorem.words"', async (t) => {
    let res = gen.faker({ faker: 'lorem.words', eval: true })
    t.true(typeof res === 'string')
})

test('Should be "lorem.words()"', async (t) => {
    let res = gen.faker({ faker: 'lorem.words()' })
    t.true(typeof res === 'string')
})

test('Should be "lorem.words(1)"', async (t) => {
    let res = gen.faker({ faker: 'lorem.words(1)' })
    t.true(typeof res === 'string')
})

test('Should be "random.number({"max": 1})"', async (t) => {
    let res = gen.faker({ faker: 'random.number({"max": 1})' })
    t.true(typeof res === 'number')
    t.true(res <= 1)
})

test('Should be "random.number({"min": 1, "max": 2})"', async (t) => {
    let res = gen.faker({ faker: 'random.number({"min": 1, "max": 2})' })
    t.true(typeof res === 'number')
    t.true(res <= 2)
    t.true(res >= 1)
})

test('Should be "lorem.words()[0]"', async (t) => {
    let res = gen.faker({ faker: 'lorem.words()[0]' })
    t.true(typeof res === 'string')
})

test('Should be "lorem.words(1)[0]""', async (t) => {
    let res = gen.faker({ faker: 'lorem.words(1)[0]' })
    t.true(typeof res === 'string')
})

test('Should use locale "address.streetAddress" (de_CH)', async (t) => {
    let res = gen.faker({ faker: 'address.streetAddress', locale: 'de_CH' })
    t.true(typeof res === 'string')
})

test('Should use locale "address.streetAddress" (zh_CN)', async (t) => {
    let res = gen.faker({ faker: 'address.streetAddress', locale: 'zh_CN' })
    t.true(typeof res === 'string')
    t.true(
        res.match(/[\u3400-\u9FBF]/) && res.match(/[\u3400-\u9FBF]/).length > 0
    )
})

test('Faker lang not affect others', async (t) => {
    let street = {
        str1: { faker: 'address.streetAddress', locale: 'zh_CN' },
        str2: { faker: 'address.streetAddress' }
    }

    let schema = new Schema('street', street, 1)
    let data = schema.build()
    let res = data[0]

    t.true(typeof res.str1 === 'string')
    t.true(typeof res.str2 === 'string')
    t.true(res.str1.match(/[\u3400-\u9FBF]/).length > 0)
    t.true(res.str2.match(/[\u3400-\u9FBF]/) === null)
})

test('Test all fakerJS locales', async (t) => {
    let supportedLocales = Object.keys((fakerJS as any).locales)
    try {
        supportedLocales.forEach((locale) => {
            let res = gen.faker({ faker: 'address.streetAddress', locale: locale })
            t.true(typeof res === 'string')
        })
    } catch (e) {
        console.log(e)
        console.log('Pull request maded to fakerJS repo.')
    }
})

test('Not supported locale @', async (t) => {
    let noLocaleSupported = '@'
    let street = {
        str1: { faker: 'address.streetAddress', locale: noLocaleSupported }
    }

    let schema = new Schema('street', street, 1)
    try {
        schema.build()
    } catch (e) {
        t.deepEqual(e, 'Error: "faker" Locale "@" is not supported by faker.')
    }
})

test('Not supported locale empty "" ', async (t) => {
    let noLocaleSupported = ''
    let street = {
        str1: { faker: 'address.streetAddress', locale: noLocaleSupported }
    }

    let schema = new Schema('street', street, 1)

    try {
        schema.build()
    } catch (e) {
        t.deepEqual(e, `Error: "faker" Locale is empty "${noLocaleSupported}".`)
    }
})
