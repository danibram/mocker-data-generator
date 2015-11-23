require('babel-polyfill')
import Mocker from '../src/index.ts'

const mocker = function(config) {
    return new Mocker(config)
}

export default mocker
