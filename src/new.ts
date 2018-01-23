import { Readable } from 'stream'
import { Generator } from './lib/Generator'
// import * as F from 'faker'

// const faker = cfg => {
//     let faker = F
//     let db = this.DB
//     let object = this.object
//     let re
//     let matches
//     let strFn

//     if (cfg.locale === '') {
//         throw `Locale is empty '${cfg.locale}'.`
//     }

//     if (cfg.locale) {
//         let supportedLocales = Object.keys((faker as any).locales)
//         if (supportedLocales.indexOf(cfg.locale) === -1) {
//             throw `Locale '${cfg.locale}' is not supported by faker.`
//         }

//         faker = require('faker/locale/' + cfg.locale)
//     }

//     re = /(^[a-zA-Z.]*)/ // aZ.aZ
//     matches = re.exec(cfg.faker)
//     if (matches && matches.length === 2) {
//         strFn = 'faker.' + cfg.faker
//     }

//     re = /\((.*?)\)/ // Match ()
//     matches = re.exec(cfg.faker)
//     if (!matches) {
//         strFn = 'faker.' + cfg.faker + '()'
//     }

//     return eval(strFn)
// }

// const fakerMix = cfg => {
//     let faker = F
//     let db = this.DB
//     let object = this.object
//     let re
//     let matches
//     let strFn

//     if (cfg.locale === '') {
//         throw `Locale is empty '${cfg.locale}'.`
//     }

//     if (cfg.locale) {
//         let supportedLocales = Object.keys((faker as any).locales)
//         if (supportedLocales.indexOf(cfg.locale) === -1) {
//             throw `Locale '${cfg.locale}' is not supported by faker.`
//         }

//         faker = require('faker/locale/' + cfg.locale)
//     }

//     // re = /(^[a-zA-Z.]*)/ // aZ.aZ
//     // matches = re.exec(cfg.faker)
//     // if (matches && matches.length === 2) {
//     //     strFn = 'faker.' + cfg.faker
//     // }

//     // re = /\((.*?)\)/ // Match ()
//     // matches = re.exec(cfg.faker)
//     // if (!matches) {
//     //     strFn = 'faker.' + cfg.faker + '()'
//     // }

//     // return eval(strFn)

//     let [body, args] = cfg.faker.split('(')
//     body = body.split('.')
//     let func = body.reduce((acc, val) => {
//         return acc[val]
//     }, F)
//     if (args) {
//         args = args.slice(0, -1).split(',')
//     }

//     args = args ? args : []

//     return func.call(this, ...args)
// }

// const fakerDirect = cfg => {
//     let func = cfg.faker.reduce((acc, val) => {
//         return acc[val]
//     }, F)

//     return func()
// }

// const gen = new Generator()

// console.time('fakerEval')
// let res = faker({ faker: 'lorem.words()' })
// console.timeEnd('fakerEval')
// console.log(res)

// console.time('fakerMix')
// let res2 = fakerMix({ faker: 'lorem.words' })
// console.timeEnd('fakerMix')
// console.log(res2)

const gen = new Generator()
try {
    let res = gen.chance({ chance: 'integer' })
    console.log(res)
} catch (e) {
    throw e
}
