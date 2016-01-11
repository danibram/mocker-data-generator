require('babel-polyfill')
import Mocker from './Mocker'

const initMocker = function(opts) {
    return new Mocker(opts)
}

module.exports = initMocker
