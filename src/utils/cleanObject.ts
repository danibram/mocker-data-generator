import * as iterator from './iterator.ts'

export interface cleanerOpts {
    strict: Boolean
    symbol: string
}

export default function(paths: string[], object: {}, options: cleanerOpts) {
    return new Promise((resolve) => {
        //clean specific paths
        let objectCleaner = function *(path: string, obj: {}, options) {
            let lvls = path.split(options.symbol)
            let dest = obj

            if (!lvls || lvls.length === 0) { return }
            if (!obj) { return }

            for (var i = 0; i< lvls.length; i++) {
                let field = lvls[i]
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

            if (lvls.length > 0){
                yield *objectCleaner(lvls.join(options.symbol), obj, options)
            } else {
                return
            }
        }

        let forEachPath = function *(path: string, object: {}, options) {
            let lvls = path.split(options.symbol)
            let dest = object

            for (var i = 0; i < lvls.length; i++) {
                let field = lvls[i]
                if (i === lvls.length - 1) {
                    // delete specific path
                    delete dest[field]
                    //clean specific path
                    yield *objectCleaner(path, object, options)
                } else {
                    dest = dest[field]
                }
            }


        }

        let forPaths = function *(paths: string[], object: {}, options) {
            for (var i = 0; i < paths.length; i++) {
                let path = paths[i]
                yield *forEachPath(path, object, options)
            }
        }
        let it = forPaths(paths, object, options);
        for (const res of it) { }

        resolve(object)
    })
}
