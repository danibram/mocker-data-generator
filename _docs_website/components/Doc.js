import React from 'react'
import dynamic from 'next/dynamic'

import value from '../static/examples.json'
const Editor = dynamic(import('./Editor'), { ssr: false })
const SEditor = dynamic(import('./Split-Editor'), { ssr: false })

import Router from 'next/router'

export default class Index extends React.Component {
    state = {
        value: '',
        error: null,
        compiled: '',
        examples: [],
        mocker: null,
        mockerLoaded: false
    }

    selectExample(ex) {
        this.onChangeCode([value[ex]])
    }

    syncHash = () => {
        if (typeof window !== 'undefined') {
            var hash = window.location.hash
            if (hash === '') {
                hash = '#initial'
            }
            hash = hash.split('#').reverse()[0]
            this.setState({ hash })
            this.state.mockerLoaded && this.props.ready
                ? this.onChangeCode([value[hash]])
                : () => {}
        }
    }

    componentDidMount() {
        this.setState({ examples: Object.keys(value) })

        import('../../build/main/index.js').then(m => {
            this.setState({ mocker: m.mocker, mockerLoaded: true })
            this.syncHash()
        })
        window.addEventListener('hashchange', () => this.syncHash(), false)
    }

    onChangeCode = ([value]) => {
        this.setState({ value })
        if (!this.state.mocker) return

        const mocker = this.state.mocker
        try {
            let compiled = eval(value)
            compiled.build((err, data) => {
                console.log(err)
                console.log(data)
                this.setState({
                    error: null,
                    compiled: JSON.stringify(data, null, 2)
                })
            })
        } catch (error) {
            this.setState({
                error
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', () => this.syncHash(), false)
    }

    render() {
        return (
            <div className="pure-g" style={{ letterSpacing: '0 !important' }}>
                {this.state.mockerLoaded && this.props.ready ? null : (
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#fff',
                            zIndex: 999999
                        }}
                    >
                        <div className="sk-cube-grid">
                            <div className="sk-cube sk-cube1" />
                            <div className="sk-cube sk-cube2" />
                            <div className="sk-cube sk-cube3" />
                            <div className="sk-cube sk-cube4" />
                            <div className="sk-cube sk-cube5" />
                            <div className="sk-cube sk-cube6" />
                            <div className="sk-cube sk-cube7" />
                            <div className="sk-cube sk-cube8" />
                            <div className="sk-cube sk-cube9" />
                        </div>
                    </div>
                )}

                <div className="container">
                    <div className="columns">
                        <div className="column col-1">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a href="#">{'Examples: '}</a>
                                    <ul className="nav">
                                        {this.state.examples.map((e, i) => (
                                            <li
                                                className={`nav-item ${
                                                    e === this.state.hash
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                key={i}
                                            >
                                                <a
                                                    href={`#${e}`}
                                                    onClick={() =>
                                                        this.selectExample(e)
                                                    }
                                                >{`${e[0].toUpperCase() +
                                                    e.substring(1)}`}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="column col-11">
                            <div className="columns">
                                <div className="column col-12">
                                    {this.state.error ? (
                                        <div className="toast toast-error">
                                            {`There is an error: ${this.state.error.toString()}`}
                                        </div>
                                    ) : (
                                        <div className="toast toast-success">
                                            {`Text is valid!!`}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pure-u-1" />
                            <div className="pure-u-1">
                                <SEditor
                                    value={this.state.value}
                                    output={this.state.compiled}
                                    onChange={this.onChangeCode}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
