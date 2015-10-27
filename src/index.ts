import faker = require('faker')
import Immutable = require('immutable')

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
        const entityPlural = utils.pluralize(entity)
        this.data[entityPlural] = []
        this.initialData = {}

        return new Promise((resolve, reject) => {
            let finalCb = () => {
                this.data[entityPlural] = d
                resolve(this.data)
            }

            if ((Number as any).isInteger(options)){

                utils.repeatFN( options,
                    (nxt) => {
                        let cfg = this.config.toJS()

                        if (utils.iamLastParent(cfg[entity])) {
                            this.generateField(cfg[entity], function(data){
                                d.push(data)
                                nxt()
                            })
                        } else {
                            this.generateEntity(cfg[entity], function (data) {
                                d.push(data)
                                nxt()
                            })
                        }
                    },
                    finalCb
                )
            } else {

                let cfg = this.config.toJS()
                let f = options.uniqueField
                let possibleValues
                if (f === '.') {
                    possibleValues = cfg[entity].values
                } else {
                    possibleValues = cfg[entity][f].values
                }

                let length = possibleValues.length

                utils.eachSeries(
                    possibleValues,
                    (k, nxt) => {
                        let cfg = this.config.toJS()

                        if (f === '.') {
                            d.push(k)
                            return nxt()
                        }

                        this.initialData[f] = k

                        this.generateEntity(cfg[entity], (data) => {
                            d.push(data)
                            nxt()
                        })
                    },
                    finalCb
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
            (k, parent, nxt) => {
                let fieldCalculated
                let child = parent[k]
                if (utils.iamLastParent(child)) {
                    this.generateField(child, (fieldCalculated) => {
                        if (!utils.isConditional(k)){
                            parent[k] = fieldCalculated
                        } else {
                            var key = k.split(',')
                            if (utils.evalWithContextData(key[0], this.entity)){
                                parent[key[1]] = fieldCalculated
                                delete parent[key]
                            } else {
                                delete parent[key]
                            }
                        }
                        nxt()
                    })
                } else {
                    this.iterator(child, ()=>{
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
