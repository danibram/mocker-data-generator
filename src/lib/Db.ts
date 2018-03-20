let databaseSymbol = Symbol('database')

export default class Database {
    db: Map<string, any>

    constructor() {
        this.db = new Map()
    }

    get(Model?) {
        let s = this[databaseSymbol]
        return Model ? s.get(Model) : s
    }

    add(Model, data) {
        this.get().set(Model, data)
    }
}
