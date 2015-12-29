require('babel-polyfill')
import Mocker from '../src/index.ts'

const mocker = function(config, opts) {
    return new Mocker(config, opts)
}

module.exports = mocker
