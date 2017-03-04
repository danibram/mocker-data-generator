import { test } from 'ava'
import { Schema } from '../../'
import { isArray, isObject } from '../utils'

let schema = new Schema('test', {}, {})

const arrayGenerationFixed = (arrayModel, result) => {
    let length = 10

    let arrResult = Array.from(new Array(10)).map(( _, index) => result )

    let arr: any[] = []
    for (let i = 0; i < arrayModel.length; i++) {
        arr.push(result)
    }

    let situation = {
        test: [{ ...arrayModel, length: 10, fixedLength: true }]
    }

    return {
        model: situation,
        expectedResult: {
            test: arrResult
        }
    }
}

test('Array: It should recognise static field', async t => {

    let { model, expectedResult } = arrayGenerationFixed({ static: 'hello' }, 'hello')

    let schema = new Schema('web', model, 1)
    let data = schema.build()

    t.deepEqual(data[0], expectedResult)
})

test('Array: It should recognise arrow function field', async t => {

    let { model, expectedResult } = arrayGenerationFixed({ function: () => 'hello' }, 'hello')

    let schema = new Schema('web', model, 1)
    let data = schema.build()

    t.deepEqual(data[0], expectedResult)
})

test('Array: It should recognise normal function field', async t => {

    let { model, expectedResult } = arrayGenerationFixed({function: function () { return 'hello' } }, 'hello')

    let schema = new Schema('web', model, 1)
    let data = schema.build()

    t.deepEqual(data[0], expectedResult)
})

test('Array: It should recognise index param in normal function field', async t => {

    let expectedResult = {
        test: Array.from(new Array(10)).map(( _, index) => index )
    }

    let model = {
        test: [{
            function: function(i) { return i },
            length: 10,
            fixedLength: true
        }]
    }

    let schema = new Schema('web', model, 1)
    let data = schema.build()

    t.deepEqual(data[0], expectedResult)
})

test('Array: It should recognise index param in arrow function field', async t => {

    let expectedResult = {
        test: Array.from(new Array(10)).map(( _, index) => index )
    }

    let model = {
        test: [{
            function: (i) => i,
            length: 10,
            fixedLength: true
        }]
    }

    let schema = new Schema('web', model, 1)
    let data = schema.build()

    t.deepEqual(data[0], expectedResult)
})

test('Array: It should recognise context in function field', async t => {

    let model = {
        test: [{
            function: function () { return { ...this} },
            length: 10,
            fixedLength: true
        }]
    }

    let schema = new Schema('web', model, 1)
    let data = schema.build()

    data[0].test.forEach(d => {
        let keys = Object.keys(d)
        t.deepEqual(keys, [ 'object', 'db', 'faker', 'chance', 'casual', 'randexp' ])
    })
})

test('Array: It should concat elements', async t => {
    let model = {
        name: {
            values: ['txuri', 'pitxi', 'kitty']
        },
        emails: [{
            faker: 'lorem.words()[0]',
            length: 10,
            concat: '[object.name, object.name]'
        }]
    }

    let schema = new Schema('test', model, 1)
    let data = schema.build()

    t.true(isArray(data[0].emails))
    t.true(data[0].emails.length < 13)
    t.true(data[0].emails.length > 2)


})

/*
// TODO: check this behaviour
test('Should generate correctly with 2 ways of Array specification', async t => {
    let values = ['txuri', 'pitxi', 'kitty']
    let model = {
        name: {
            values,
        },
        name2: values
    }

    let schema = new Schema('test', model, 1)
    let data = schema.build()
    console.log(data[0])
    t.true(values.indexOf(data[0].name) > -1)
    t.true(values.indexOf(data[0].name2) > -1)
})*/

test('Array: It should concatenated strings but not repeat same element itself (concatStrict)', async t => {
    let model = {
        name: {
            values: ['txuri', 'pitxi', 'kitty']
        },
        emails: [{
            faker: 'lorem.words()[0]',
            length: 4,
            concat: '[object.name, object.name]',
            concatStrict: true,
            fixedLength: true
        }]
    }

    let schema = new Schema('test', model, 1)
    let data = schema.build()

    t.true(isArray(data[0].emails))
    t.true(data[0].emails.length === 4)

    let appeared = 0
    data[0].emails.forEach(d => {
        appeared = (d === data[0].name) ? appeared + 1 : appeared
    })
    t.true(appeared === 1)
})

test('Array: It should concatenated strings but increase the length if it is fixed', async t => {
    let model = {
        name: {
            values: ['txuri', 'pitxi', 'kitty']
        },
        emails: [{
            faker: 'lorem.words()[0]',
            length: 10,
            concat: '[object.name, object.name]',
            fixedLength: true
        }]
    }

    let schema = new Schema('test', model, 1)
    let data = schema.build()

    t.true(isArray(data[0].emails))
    t.true(data[0].emails.length === 10)

    let appeared = 0
    data[0].emails.forEach(d => {
        appeared = (d === data[0].name) ? appeared + 1 : appeared
    })
    t.true(appeared === 2)
})
