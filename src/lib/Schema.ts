import { Generator } from './Generator'
import {
    evalWithContextData,
    fieldArrayCalcLength,
    iamLastParent,
    isArray,
    isConditional,
    isObject
} from './utils'

let iterate = function(obj, res, currentPath) {
    if (!currentPath) {
        currentPath = []
    }
    Object.keys(obj).map(k => {
        let value = obj[k]

        let path = currentPath.slice(0)
        path.push(k)

        if (iamLastParent(value)) {
            if (path) {
                if (isArray(value)) {
                    if (value[0] && value[0].virtual) {
                        this.virtualPaths.push(path.toString())
                    }
                } else {
                    if (value.virtual) {
                        this.virtualPaths.push(path.toString())
                    }
                }
            }

            let key = ''

            if (!isConditional(k)) {
                key = k
            } else {
                let keykey = k.split(',')
                if (evalWithContextData(keykey[0], this.object)) {
                    key = keykey[1]
                }
            }

            if (key !== '') {
                res[key] = this.proccessLeaf(value)
            }
        } else {
            res[k] = {}
            iterate.call(this, value, res[k], path)
        }
    })
}

export class Schema extends Generator {
    constructor(name: string, cfg, options) {
        super()
        this.schema = cfg
        this.name = name
        this.options = options

        // Temp fields
        this.DB = {}
        this.object = {}
        this.virtualPaths = []
    }

    proccessLeaf(field) {
        if (isArray(field)) {
            let fieldConfig = field[0]

            if (field.length > 1) {
                fieldConfig = { values: field }
            }

            let na = Array()
            if (fieldConfig.concat) {
                na = evalWithContextData(
                    fieldConfig.concat,
                    this.object,
                    this.DB
                )
                // Strict Mode

                na = fieldConfig.concatStrict
                    ? [...Array.from(new Set(na))]
                    : na
            }

            let length = fieldArrayCalcLength(fieldConfig, na.length, this)

            let array = Array.from(new Array(length)).reduce(
                (acc, el, index) => {
                    let self = acc.slice(0)
                    acc.push(
                        this.generateField(fieldConfig, index, length, self)
                    )
                    return acc
                },
                []
            )

            return array.concat(na)
        } else {
            return this.generateField(field)
        }
    }

    generateField(cfg, ...args): {} {
        let result = {}
        let generators = [
            'faker',
            'chance',
            'casual',
            'randexp',
            'self',
            'db',
            'hasOne',
            'hasMany',
            'static',
            'function',
            'values',
            'incrementalId'
        ]

        let keys = Object.keys(cfg)

        let key = keys.reduce((acc, val) => {
            if ((generators as any).includes(val)) {
                acc = val
            }
            return acc
        }, 'noKey')

        if (key === 'noKey' && !(keys as any).includes('eval')) {
            throw `Error: Cant find key, please check model and use one of this [${generators.join(
                ','
            )}]`
        }

        if ((keys as any).includes('eval') && keys.length === 1) {
            key = 'eval'
        }

        try {
            result = this[key](cfg, ...args)
        } catch (e) {
            throw 'Error: "' + key + '" ' + e
        }

        return result
    }

    buildSingle(schema) {
        if (iamLastParent(schema)) {
            this.object = this.proccessLeaf(schema)
        } else {
            iterate.call(this, schema, this.object)
        }
    }

    build(db = {}) {
        this.object = {}
        this.DB = db ? db : {}
        this.DB[this.name] = []

        if (Number.isInteger(this.options as any)) {
            Array.from(new Array(this.options)).map(() => {
                this.buildSingle(this.schema)
                this.DB[this.name].push(this.object)
                this.object = {}
            })
        } else if (isObject(this.options) && this.options.max) {
            let max = this.options.max
            let min = this.options.min ? this.options.min : 0

            let length = Math.floor(Math.random() * (max - min + 1) + min)

            Array.from(new Array(length)).map(() => {
                this.buildSingle(this.schema)
                this.DB[this.name].push(this.object)
                this.object = {}
            })
        } else if (isObject(this.options) && this.options.uniqueField) {
            let f = this.options.uniqueField
            let entityConfig = this.schema
            let possibleValues
            if (f === '.') {
                possibleValues = this.schema.values
            } else {
                if (this.schema[f]) {
                    if (isArray(this.schema[f].values)) {
                        possibleValues = this.schema[f].values
                    } else {
                        possibleValues = this.schema[f]
                    }
                } else {
                    throw `The field "${f}" not exists.`
                }
            }

            if (!isArray(possibleValues)) {
                throw `The posible values value is not an Array`
            }

            possibleValues.map(value => {
                if (f === '.') {
                    return
                }

                entityConfig[f] = { static: value }

                this.buildSingle(entityConfig)
                this.DB[this.name].push(this.object)
                this.object = {}
            })
        } else {
            throw `An string "${
                this.options
            }" is not recognized as a parameter.`
        }
        return this.DB[this.name]
    }
}
