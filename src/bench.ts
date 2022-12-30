import * as fakerJS from 'faker'
import { Generator } from './lib/Generator'

const gen = new Generator<any>()

let res
console.time('faker new')
res = gen.custom({ generator: fakerJS, input: 'lorem.words' })
console.timeEnd('faker new')

console.time('faker eval')
res = gen.custom({ generator: fakerJS, input: 'lorem.words', eval: true })
console.timeEnd('faker eval')
