import faker = require('faker')
import Immutable = require('immutable');

import * as utils from './utils.ts'

export default class Mocker {

    public config: Immutable.Map<string, number>
    public data = {}
    public entity = {}
    public initialData = null
    public path = []

    constructor(config: any) {
        this.config = Immutable.fromJS(config)
    }

    generate(entity: string, options: any) {
        let d = []
        this.data[entity + 's'] = []
        this.initialData = {}

        return new Promise((resolve, reject) => {
            if ((Number as any).isInteger(options)){

                utils.repeatFN( options,
                    (nxt) => {
                        let cfg = this.config.toJS()
                        this.generateEntity(cfg[entity], function (data) {
                            d.push(data)
                            nxt()
                        })
                    },
                    () => {
                        this.data[entity + 's'] = d
                        resolve(this.data)
                    }
                )
            } else {
                let cfg = this.config.toJS()
                let f = options.uniqueField
                let possibleValues = cfg[entity][f].values
                let length = possibleValues.length

                utils.eachSeries(
                    possibleValues,
                    (k, nxt) => {
                        let cfg = this.config.toJS()
                        this.initialData[f] = {static: k}
                        this.generateEntity(cfg[entity], (data) => {
                            d.push(data)
                            nxt()
                        })
                    },
                    () => {
                        this.data[entity + 's'] = d
                        resolve(this.data)
                    }
                )
            }
        })
    }

    generateEntity(entityConfig: Object, cb) {

        this.entity = (Object as any).assign({}, entityConfig)

        if (this.initialData){
            this.entity = (Object as any).assign({}, this.initialData, entityConfig)
        }

        this.iterator (this.entity, function (object){
            cb(object)
        })
    }

    iterator(object, cb) {
        utils.overObject(
            object,
            (k, obj, nxt) => {
                let fieldCalculated
                let lvl = obj[k]

                if (utils.iamLastChild(lvl)){
                    this.generateField(lvl, (fieldCalculated) => {
                        if (!utils.isConditional(k)){
                            obj[k] = fieldCalculated
                        } else {
                            var key = k.split(',')
                            if (utils.evalWithContextData(key[0], this.entity)){
                                obj[key[1]] = fieldCalculated
                                delete this.entity[key]
                            } else {
                                delete this.entity[key]
                            }
                        }
                        nxt()
                    })
                } else {
                    this.iterator(lvl, () => {
                        nxt()
                    })
                }
            },
            () => {
                cb(object)
            }
        )
    }

    generateField(field, cb) {
        if ( utils.isArray(field) ){
            cb(this.generateArrayField(field[0], field[1]))
        } else {
            cb(this.generateNormalField(field))
        }
    }

    generateArrayField(fieldConfig, arrayConfig) {
        let array = []
        let length = utils.fieldArrayCalcLength(arrayConfig)
        for (let i = 0; i < length; i++) {
            array.push(this.generateNormalField(fieldConfig))
        }
        return array
    }

    generateNormalField(config) {
        let object = this.entity
        let db = this.data

        if (config.faker){
            let split = config.faker.split('.')
            return (faker as any)[split[0]][split[1]].call()
        } else if (config.values) {
            return (faker as any).random.arrayElement(config.values)
        } else if (config.function) {
            return config.function.call({object, faker, db})
        } else if (config.static) {
            return config.static
        } else {
            return null
        }
    }

}
