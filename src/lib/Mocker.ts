import { Schema } from './Schema'
import { CustomGeneratorRun, Generators } from './types'
import { cleanVirtuals } from './utils'

export type PromiseCb = Promise<any> | void
export type IDB = {
    [key: string]: any[]
}

export class Mocker {
    schemas: Schema[] = []
    DB: IDB = {}
    options = {}
    generators: Generators = {}

    constructor(options = {}) {
        this.options = options
        this.DB = {}
    }

    seed(name: string, data: any[]): Mocker {
        this.DB[name] = data
        return this
    }

    addGenerator(name: string, library: any, run?: CustomGeneratorRun): Mocker {
        this.generators[name] = { library, run }
        return this
    }

    schema(name: string, schema: {}, options?: {}): Mocker {
        this.schemas.push(new Schema(name, schema, options))
        return this
    }

    reset(): Mocker {
        this.DB = {}
        return this
    }

    restart(): Mocker {
        this.DB = {}
        this.schemas = []
        return this
    }

    private _buildSync() {
        this.schemas.reduce((acc, schema) => {
            let instances

            try {
                instances = schema.build(this.generators, acc)
            } catch (e) {
                throw new Error('Schema: "' + schema.name + '" ' + e)
            }

            // Clean virtuals
            if (schema.virtualPaths.length > 0) {
                instances.forEach((x) =>
                    cleanVirtuals(schema.virtualPaths, x, {
                        strict: true,
                        symbol: ','
                    })
                )
            }

            // Add to db
            acc[schema.name] = instances

            return acc
        }, this.DB)
    }

    buildSync() {
        this._buildSync()
        return this.DB
    }

    build(cb?: (error: Error | null, _?: any) => void): Promise<any>
    build(cb?: (error: Error | null, _?: any) => void): void
    build(cb?: (error: Error | null, _?: any) => void): any {
        try {
            this._buildSync()
        } catch (e) {
            return cb ? cb(e) : Promise.reject(e)
        }

        return cb ? cb(null, this.DB) : Promise.resolve(this.DB)
    }
}
