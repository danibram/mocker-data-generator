import { Schema } from './Schema'
import { cleanVirtuals } from './utils'

export class Mocker {

    schemas: Schema[] = []
    options = {}
    DB = {}

    constructor (options= {}) {
        this.options = options
        this.DB = {}
    }

    schema (name: string, schema: {}, options?: {}): Mocker {
        this.schemas.push(new Schema(name, schema, options))
        return this
    }

    reset (): Mocker {
        this.DB = {}
        return this
    }

    restart (): Mocker {
        this.DB = {}
        this.schemas = []
        return this
    }

    build (cb?): {} | Promise<{}> {
        this.schemas.reduce((acc, schema) => {
            let instances

            try {
                instances = schema.build(acc)
            } catch (e) {
                console.error(new Error(' Schema: "' + schema.name + '" ' + e))
            }

            // Clean virtuals
            if (schema.virtualPaths.length > 0) {
                instances.forEach(x => cleanVirtuals(schema.virtualPaths, x, {strict: true, symbol: ','}))
            }

            // Add to db
            acc[schema.name] = instances

            return acc
        }, this.DB)

        if (cb) {
            return cb(this.DB)
        } else {
            return Promise.resolve(this.DB)
        }
    }
}

export const mocker = (opts?) => new Mocker(opts)
