import * as utils from './index.ts'

export const eachLvl = function (obj: {}, processor: Function, currentPath?: string[]) {

   if (!currentPath) { currentPath = []; }
   if (obj) {
       Object.keys(obj).forEach((k) => {
           let value = obj[k]
           if (utils.iamLastParent(value)) {
               processor(obj, k, value)
           } else {
               let path = currentPath.slice(0)
               path.push(k)
               eachLvl(value, processor, path)
           }
       });
   }

   return
}
