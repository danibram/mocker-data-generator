export const isArray = (arg: any): boolean =>
    Object.prototype.toString.call(arg) === '[object Array]'

export const isObject = (arg: any): boolean =>
    Object.prototype.toString.call(arg) === '[object Object]'

export const evalWithContextData = (
    key: string,
    object: {},
    db: {},
    generators: {}
) => {
    // In this (way, we can pass object and use inside the eval string
    return eval(key)
}

export const fieldArrayCalcLength = (config, fixedArrayLength, schema) => {
    let length
    if (typeof config.length === 'function') {
        length = config.length.call(schema)
    } else if (config.fixedLength) {
        length = config.length - fixedArrayLength
    } else {
        length = Math.floor(Math.random() * config.length + 1)
    }
    return length
}

export const iamLastChild = (parent, k) => {
    if (isArray(parent[k])) {
        let last = false

        if (parent[k].length === 0) {
            return true
        }

        for (let i = 0; i < parent[k].length; i++) {
            const el = parent[k][i]
            last = !isObject(el)
            if (last) {
                break
            }
        }
        return last
    } else {
        return !isObject(parent[k])
    }
}

export const iamLastParent = (obj) => {
    let last = false
    if (isObject(obj)) {
        const ks = Object.keys(obj)

        for (let i = 0; i < ks.length; i++) {
            const k = ks[i]
            last = iamLastChild(obj, k)
            if (!last) {
                break
            }
        }
    } else {
        last = true
    }
    return last
}

export const isConditional = (str) => {
    const arr = str.split(',')
    return arr.length > 1
}

export const cleanVirtuals = (paths, object, options) => {
    // clean specific paths
    const objectCleaner = function* (path, obj, options) {
        const lvls = path.split(options.symbol)
        let dest = obj

        if (!lvls || lvls.length === 0) {
            return
        }
        if (!obj) {
            return
        }

        for (let i = 0; i < lvls.length; i++) {
            const field = lvls[i]
            if (i === lvls.length - 1 && dest[field]) {
                if (Object.getOwnPropertyNames(dest[field]).length < 1) {
                    delete dest[field]
                    break
                }
            } else {
                dest = dest[field]
            }
        }
        lvls.pop()

        if (lvls.length > 0) {
            yield* objectCleaner(lvls.join(options.symbol), obj, options)
        } else {
            return
        }
    }

    const forEachPath = function* (path, object, options) {
        const lvls = path.split(options.symbol)
        let dest = object

        for (let i = 0; i < lvls.length; i++) {
            const field = lvls[i]
            if (i === lvls.length - 1) {
                // delete specific path
                delete dest[field]
                // clean specific path
                yield* objectCleaner(path, object, options)
            } else {
                dest = dest[field]
            }
        }
    }

    const forPaths = function* (paths, object, options) {
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i]
            yield* Array.from(forEachPath(path, object, options))
        }
    }

    for (const res of Array.from(forPaths(paths, object, options))) {
    }

    return object
}

export const stringToPathOrCall = function (name, fn, cfg) {
    let [body, args] = cfg.split('(')

    body = body.split('.')

    const func = body.reduce((acc, val) => {
        if (!acc[val]) {
            throw `This ${name} method doesnt exists '${cfg}'.`
        }
        return acc[val]
    }, fn)

    if (!args) {
        if (typeof func === 'function') {
            return func.call(this)
        } else {
            return func
        }
    }

    let [args2, mods] = args.split(')')

    args = args2
        ? args2[0] === '{'
            ? [JSON.parse(args2)]
            : args2
                  .split(',')
                  .map((e) => (/^\d+$/.test(e) ? Number.parseInt(e) : e))
        : []

    const result = func.call(this, ...args)

    if (!mods || mods === '') {
        return result
    }

    mods = mods
        .split('[')
        .filter((i) => i !== '')
        .map((i) => i.slice(0, -1))
        .map((i) => (i[0] === '"' ? i.slice(1, -1) : parseInt(i, 10)))

    return mods.reduce((acc, val) => {
        if (!acc[val]) {
            throw `'${acc}' doesnt have key '${val}'.`
        }
        return acc[val]
    }, result)
}

export const loopInside = (object: any, path: string) => {
    const p = path.split('.')

    return p.reduce((acc, val) => {
        if (acc[val] === null) {
            throw `'${acc}' doesnt have key '${val}'.`
        }
        return acc[val]
    }, object)
}
