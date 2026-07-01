import { Mocker } from './lib/Mocker.js'

export * from './lib/Generator.js'
export * from './lib/Mocker.js'
export * from './lib/Schema.js'

export const mocker = (opts?) => new Mocker(opts)
export default mocker
