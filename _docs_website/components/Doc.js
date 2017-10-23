import React from 'react'
import dynamic from 'next/dynamic'

import value from '../static/examples.json'
const Editor = dynamic(import('./Editor'), { ssr: false })
const SEditor = dynamic(import('./Split-Editor'), { ssr: false })

export default class Index extends React.Component {
    state = {
        value: '',
        error: null,
        compiled: '',
        examples: [],
        mocker: null
    }

    componentDidMount() {
        this.setState({ examples: Object.keys(value) })
        this.onChangeCode([value.initial])
        System.import('../../build/main/index.js').then(m => {
            this.setState({ mocker: m.mocker })
        })
    }

    onChangeCode = ([value]) => {
        this.setState({ value })
        if (!this.state.mocker) return

        const mocker = this.state.mocker
        try {
            let compiled = eval(value)
            compiled.build(data => {
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

    render() {
        return (
            <div className="pure-g" style={{ letterSpacing: '0 !important' }}>
                <h2 style={{ paddingTop: '0.83em', paddingLeft: '0.2em' }}>
                    {'Example: '}
                    <select id="state" className="pure-input-1-2">
                        {this.state.examples.map((e, i) => (
                            <option key={i}>{e}</option>
                        ))}
                    </select>
                </h2>
                <div className="pure-u-1">
                    {this.state.error ? (
                        <span style={{ fontSize: '10pt', color: 'red' }}>
                            {this.state.error.toString()}
                        </span>
                    ) : null}
                </div>
                <div className="pure-u-1">
                    <SEditor
                        value={this.state.value}
                        output={this.state.compiled}
                        onChange={this.onChangeCode}
                    />
                </div>
            </div>
        )
    }
}
