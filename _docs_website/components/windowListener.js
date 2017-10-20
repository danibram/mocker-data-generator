import * as React from 'react'
import * as debounce from 'lodash.debounce'

export class WindowSizeListener extends React.Component {
    displayName = 'WindowSizeListener'
    _listeners = []
    _debouncedResize
    _DEBOUNCE_TIME = 1000

    shouldComponentUpdate(nextProps) {
        return nextProps.onResize !== this.props.onResize
    }

    componentDidMount() {
        // Defer creating _debouncedResize until it's mounted
        // This allows users to change DEBOUNCE_TIME if they want
        // If there's no listeners, we need to attach the window listener
        if (!this._listeners.length) {
            this._debouncedResize = debounce(this.onResize, this.DEBOUNCE_TIME)
            window.addEventListener('resize', this._debouncedResize, false)
        }
        this._listeners.push(this.props.onResize)
        this._debouncedResize()
    }

    componentWillUnmount() {
        const idx = this._listeners.indexOf(this.props.onResize)
        this._listeners.splice(idx, 1)
        if (!this._listeners.length) {
            window.removeEventListener('resize', this._debouncedResize, false)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.onResize !== this.props.onResize) {
            const idx = this._listeners.indexOf(this.props.onResize)
            this._listeners.splice(idx, 1, nextProps.onResize)
        }
    }

    onResize = () => {
        const windowWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth
        const windowHeight =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight

        this._listeners.forEach(listener => {
            listener({ windowWidth, windowHeight })
        })
    }

    render() {
        return null
    }

    get DEBOUNCE_TIME() {
        return this._DEBOUNCE_TIME
    }

    set DEBOUNCE_TIME(value) {
        this._DEBOUNCE_TIME = value
    }
}
