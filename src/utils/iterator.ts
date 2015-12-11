import * as utils from './index.ts'

export const it = function *(obj: {}, currentPath?: string[]) {
    if (!obj) { return }
    if (!currentPath) { currentPath = [] }

    let fields = Object.keys(obj)
    for (var i = 0; i< fields.length; i++) {
        let k = fields[i]
        let value = obj[k]

        let path = currentPath.slice(0)
        path.push(k)


        if (utils.iamLastParent(value)) {
            yield {obj, k, value, path}
        } else {
            let path = currentPath.slice(0)
            path.push(k)
            yield *it(value, path)
        }
    }
}
