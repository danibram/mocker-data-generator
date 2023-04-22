import * as fakerJS from 'faker'
var Generator = require('../build/main').Generator

const gen = new Generator()

let res
console.time('faker new')
res = gen.custom({ generator: fakerJS, input: 'lorem.words' })
console.timeEnd('faker new')

console.time('faker eval')
res = gen.custom({ generator: fakerJS, input: 'lorem.words', eval: true })
console.timeEnd('faker eval')
