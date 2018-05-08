import * as R from 'randexp'
import * as f from 'faker'
const c = require('casual-browserify')
// import * as c from 'casual-browserify'
import { Chance } from 'chance'
const ch = new Chance()

import { fnParser, loopInside } from './utils'

export class Generator {
    name: string
    DB: {}
    object: {}
    schema: {
        values: string[]
    }
    options: {
        uniqueField: string
        max: number
        min: number
    }
    virtualPaths: string[]

    faker(cfg: { locale?: string; faker: string; eval?: boolean }) {
        let faker = f
        let db = this.DB
        let object = this.object
        let re
        let matches
        let strFn

        if (cfg.locale === '') {
            throw `Locale is empty '${cfg.locale}'.`
        }

        if (cfg.locale) {
            let supportedLocales = Object.keys((faker as any).locales)
            if (supportedLocales.indexOf(cfg.locale) === -1) {
                throw `Locale '${cfg.locale}' is not supported by faker.`
            }

            faker = require('faker/locale/' + cfg.locale)
        }

        if (cfg.eval) {
            re = /(^[a-zA-Z.]*)/ // aZ.aZ
            matches = re.exec(cfg.faker)
            if (matches && matches.length === 2) {
                strFn = 'faker.' + cfg.faker
            }

            re = /\((.*?)\)/ // Match ()
            matches = re.exec(cfg.faker)
            if (!matches) {
                strFn = 'faker.' + cfg.faker + '()'
            }

            return eval(strFn)
        } else {
            return fnParser('faker', faker, cfg.faker)
        }
    }

    chance(cfg: { chance: string; eval?: boolean }) {
        let chance = ch

        if (cfg.eval) {
            let db = this.DB
            let object = this.object

            let re = /(^[a-zA-Z.]*)/ // aZ.aZ
            let matches = re.exec(cfg.chance)
            let strFn
            if (matches && matches.length === 2) {
                strFn = 'chance.' + cfg.chance
            }

            re = /\((.*?)\)/ // Match ()
            matches = re.exec(cfg.chance)
            if (!matches) {
                strFn = 'chance.' + cfg.chance + '()'
            }

            return eval(strFn)
        } else {
            return fnParser.call(chance, 'chance', chance, cfg.chance)
        }
    }

    casual(cfg: { eval?: boolean; casual: string }) {
        let casual = c

        if (cfg.eval) {
            let re = /(^[a-zA-Z.]*)/ // aZ.aZ
            let matches = re.exec(cfg.casual)
            let strFn
            if (matches && matches.length === 2) {
                strFn = 'casual.' + cfg.casual
            }

            return eval(strFn)
        } else {
            return fnParser.call(casual, 'casual', casual, cfg.casual)
        }
    }

    randexp(cfg: { randexp: any }) {
        return new R(cfg.randexp).gen()
    }

    self(cfg: { self: any; eval?: boolean }) {
        let object = this.object
        return cfg.eval
            ? eval('object.' + cfg.self)
            : loopInside(this.object, cfg.self)
    }

    db(cfg: { eval?: boolean; db: any }) {
        let db = this.DB
        if (cfg.eval) {
            return eval('db.' + cfg.db)
        } else {
            return loopInside(this.DB, cfg.db)
        }
    }

    eval(cfg: { eval: string }) {
        let db = this.DB
        let object = this.object
        let faker = f
        let chance = ch
        let casual = c
        let randexp = R

        return eval(cfg.eval)
    }

    values(cfg: { values: any[] }) {
        let i = Math.floor(cfg.values.length * Math.random())
        return cfg.values[i]
    }

    function(cfg: { function: any }, ...args) {
        let object = this.object
        let db = this.DB
        let faker = f
        let chance = ch
        let casual = c
        let randexp = R

        return cfg.function.call(
            { object, db, faker, chance, casual, randexp },
            ...args
        )
    }

    static(cfg: { static: any }) {
        return cfg.static
    }

    incrementalId(cfg: { incrementalId: number | true | string }) {
        let n = 0
        let db = this.DB

        if (db[this.name] && db[this.name].length) {
            n = db[this.name].length
        }
        if (cfg.incrementalId === true) {
            cfg.incrementalId = '0'
        }
        return n + parseInt(cfg.incrementalId as string, 10)
    }

    hasOne(cfg: { hasOne: string; get?: string; eval?: boolean }) {
        let db = this.DB
        let i = Math.floor(db[cfg.hasOne].length * Math.random())

        let entity = db[cfg.hasOne][i]

        if (cfg.get) {
            if (cfg.eval) {
                return eval('entity.' + cfg.get)
            } else {
                return loopInside(entity, cfg.get)
            }
        } else {
            return entity
        }
    }

    hasMany(cfg: {
        min?: number
        max?: number
        hasMany: string
        amount?: number
        get?: string
        eval?: boolean
    }) {
        let amount = 1
        let db = this.DB

        let min = cfg.min || cfg.min === 0 ? cfg.min : 1
        let max = cfg.max ? cfg.max : cfg.hasMany ? db[cfg.hasMany].length : 1

        if (cfg.amount) {
            amount = cfg.amount
        } else {
            amount = Math.floor(Math.random() * (max - min + 1)) + min
        }

        let newCfg = {
            hasOne: cfg.hasMany,
            get: cfg.get ? cfg.get : undefined,
            eval: cfg.eval ? true : false
        }
        return Array.from(new Array(amount)).map(() => this.hasOne(newCfg))
    }
}
