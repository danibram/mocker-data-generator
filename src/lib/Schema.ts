import { Generator } from './Generator'
import { Generators } from './types'
import {
    evalWithContextData,
    fieldArrayCalcLength,
    iamLastParent,
    isArray,
    isConditional,
    isObject
} from './utils'

let iterate = function (obj, res, currentPath) {
    if (!currentPath) {
        currentPath = []
    }
    Object.keys(obj).map((k) => {
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
                if (
                    evalWithContextData(
                        keykey[0],
                        this.object,
                        this.DB,
                        this.generators
                    )
                ) {
                    key = keykey[1]
                }
            }

            if (key !== '') {
                res[key] = this.proccessLeaf(value, key)
            }
        } else {
            res[k] = {}
            iterate.call(this, value, res[k], path)
        }
    })
}

export class Schema extends Generator<any> {
    constructor(name: string, cfg, options, generators: Generators = {}) {
        super()
        this.schema = cfg
        this.name = name
        this.options = options
        this.generators = generators

        // Temp fields
        this.DB = {}
        this.object = {}
        this.virtualPaths = []
    }

    proccessLeaf(field, fieldName?) {
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
                    this.DB,
                    this.generators
                )
                // Strict Mode

                na = fieldConfig.concatStrict
                    ? [...Array.from(new Set(na))]
                    : na
            }

            let length = fieldArrayCalcLength(
                field.length > 1 ? fieldConfig.values : fieldConfig,
                na.length,
                this
            )

            let array = Array.from(new Array(length)).reduce(
                (acc, el, index) => {
                    let self = acc.slice(0)
                    acc.push(
                        this.generateField(
                            fieldName,
                            fieldConfig,
                            index,
                            length,
                            self
                        )
                    )
                    return acc
                },
                []
            )

            return array.concat(na)
        } else {
            return this.generateField(fieldName, field)
        }
    }

    generateField(fieldName, cfg, ...args): {} {
        let result = {}
        let customGenerators = Object.keys(this.generators)
        let ownedByMocker = [
            'self',
            'db',
            'hasOne',
            'hasMany',
            'static',
            'function',
            'values',
            'incrementalId'
        ]
        let generators = [...ownedByMocker, ...customGenerators]

        let keys = Object.keys(cfg)

        let key = keys.reduce((acc, val) => {
            if (generators.includes(val)) {
                acc = val
            }
            return acc
        }, 'noKey')

        if (key === 'noKey' && !(keys as any).includes('eval')) {
            throw `Error: Invalid or missing generator${
                fieldName !== 'root' ? ` on field ${fieldName}` : ''
            }. Please use one of this generators [${generators.join(
                ','
            )}], note that if your generator doesnt appear in the list maybe you forgot to add it.`
        }

        if ((keys as any).includes('eval') && keys.length === 1) {
            key = 'eval'
        }

        try {
            result = customGenerators.includes(key)
                ? this.custom({
                      generator: this.generators[key]?.library,
                      run: this.generators[key]?.run,
                      input: cfg[key],
                      eval: cfg.eval
                  })
                : this[key]({ ...cfg, generators: this.generators }, ...args)
        } catch (e) {
            throw 'Error: "' + key + '" ' + e
        }

        return result
    }

    buildSingle(schema) {
        if (iamLastParent(schema)) {
            this.object = this.proccessLeaf(schema, 'root')
        } else {
            iterate.call(this, schema, this.object)
        }
    }

    build(generators: Generators = {}, db = {}) {
        this.generators = generators
        this.object = {}
        this.DB = db ? db : {}
        this.DB[this.name] = this.DB[this.name] ? this.DB[this.name] : []

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

            possibleValues.map((value) => {
                if (f === '.') {
                    return
                }

                entityConfig[f] = { static: value }

                this.buildSingle(entityConfig)
                this.DB[this.name].push(this.object)
                this.object = {}
            })
        } else {
            throw `An string "${this.options}" is not recognized as a parameter.`
        }
        return this.DB[this.name]
    }
}
