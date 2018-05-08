import './array-includes'

import { Mocker } from './lib/Mocker'
export * from './lib/Mocker'
export * from './lib/Schema'
export * from './lib/Generator'

export const mocker = (opts?) => new Mocker(opts)
export default mocker
