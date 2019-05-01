import React from 'react'
import { Tabs } from 'antd';
import './Dygraph.css';
import { Trees } from './TreeSelect'
import { Checkbox } from './Checkbox';

const TabPane = Tabs.TabPane;


class Tab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keys: [1, 2, 3, 4, 5, 6],
            active: '0',
            graphs: {

            },
            normalize: {

            }
        }
    }

    componentDidMount() {
        let ns = {}
        for (let x of this.state.keys) {
            ns["plot " + x.toString()] = false
        }
        this.setState({ normalize: ns })
    }

    active(key) {
        console.log(key)
        this.setState({ active: key })
    }

    onChange(k) {
        const f = (e) => {
            console.log(`checked ${k} = ${e.target.checked}`);
            this.setState({ normalize: this.setNormalize(this.state.normalize, k, e.target.checked) })

            const gs = this.state.graphs
            console.log(gs)

            if (gs[k] == undefined) {
                return
            }
            if (e.target.checked) {
                this.state.graphs[k].normalize()
            } else {
                this.state.graphs[k].rawData()
            }
        }
        return f
    }

    setGraphs(gs) {
        console.log(gs)
        this.setState({ graphs: gs })
    }

    setNormalize(ns, k, v) {
        ns[k] = v
        return ns
    }

    format(k) {
        const gs = this.state.graphs
        if (gs[k] == undefined) {
            return
        }
        if (this.state.normalize[k]) {
            this.state.graphs[k].normalize()
        } else {
            this.state.graphs[k].rawData()
        }
    }

    render() {

        const keys = this.state.keys

        const style = {
            position: 'relative',
            width: '100%',
            // height: '90%',
            height: '800px',
        };

        const tabs = keys.map(x => (
            <TabPane tab={"plot " + x.toString()} key={x.toString()}>
                <Checkbox onChange={this.onChange("plot " + x.toString()).bind(this)}>normalize</Checkbox>
                <div id={"plot " + x.toString()} className="dygraph" style={style}>

                </div>
            </TabPane>
        ))

        const el = (
            <Tabs onChange={this.active.bind(this)} type="card" activeKey={this.state.active}>
                <TabPane tab="data" key="0">
                    <Trees tabKeys={keys} activeTab={this.active.bind(this)} setGraphs={this.setGraphs.bind(this)} />
                    <div id="plot 0"></div>
                </TabPane>
                {tabs}
            </Tabs>
        )
        return el
    }
}

export { Tab };


