import faker = require('faker')
import * as utils from './utils.ts'

export default class Mocker {
    public data = {}
    constructor(private config: any) {}

    generate(entity: string, options: any) {
        let Phase1 = new Promise((resolve, reject) => {
            var d = []
            if ((Number as any).isInteger(options)){
                for (let i = 0; i < options; i++) {
                    d.push( this.generateEntity(this.config[entity]) )
                }
            } else {
                let cfg = this.config[entity]
                let f = options.uniqueField
                let possibleValues = cfg[f].values
                let length = possibleValues.length

                for (let i = 0; i < length; i++) {
                    let initialData = {}
                    initialData[f] = possibleValues[i]
                    d.push( this.generateEntity(this.config[entity], initialData) )
                }
            }

            this.data[entity + 's'] = d
            resolve(this.data)
        })
        return Phase1
    }

    generateEachData() {
        return new Promise((resolve, reject) => {
            let cfg = this.config
            let keys = Object.keys(cfg)

            for (let i = 0; i < keys.length; i++) {
                let key = keys[i]
                this.data[key + 's'] = [this.generateEntity(cfg[key])]
            }

            resolve(this.data)
        })
    }

    generateEntity(entityConfig: Object, initialObject: Object = {} ){
        let keys = Object.keys(entityConfig)
        let data = initialObject
        let initialKeys = Object.keys(data)

        if (utils.iamLastParent(entityConfig)){
            keys.map((k) => {
                if (initialKeys.indexOf(k) === -1){
                    let field = entityConfig[k]

                    if (!utils.isConditional(k)){
                        if ( !utils.isArray(field) ){
                            if (field.values || field.faker || field.function) {
                                data[k] = this.generateField(field, data)
                            }
                        } else {
                            if (field[0].values || field[0].faker || field[0].function) {
                                data[k] = this.generateArrayField(field[0], field[1], data)
                            }
                        }
                    } else {
                        if ( !utils.isArray(field) ){
                            var key = k.split(',')
                            if (utils.evalWithContextData(key[0], data)){
                                data[key[1]] = this.generateField(field, data)
                            }
                        } else {
                            var key = k.split(',')
                            if (utils.evalWithContextData(key[0], data)){
                                data[key[1]] = this.generateArrayField(field[0], field[1], data)
                            }
                        }
                    }
                }
            })
        }

        return data
    }

    generateArrayField(fieldConfig, arrayConfig, data?) {
        let array = []
        let length = utils.fieldArrayCalcLength(arrayConfig)
        for (let i = 0; i < length; i++) {
            array.push(this.generateField(fieldConfig, data))
        }
        return array
    }

    generateField(config, object?) {
        if (config.faker){
            let split = config.faker.split('.')
            return (faker as any)[split[0]][split[1]].call()
        } else if (config.values) {
            return (faker as any).random.arrayElement(config.values)
        } else if (config.function) {
            let db = this.data
            return config.function.call({object, faker, db})
        } else if (config.static) {
            return config.static
        } else {
            return null
        }
    }

}
