import React from 'react'
import { Tabs } from 'antd';
import './Dygraph.css';
import { Trees } from './TreeSelect'

const TabPane = Tabs.TabPane;


class Tab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: '0',
        }
    }

    active(key) {
        console.log(key)
        this.setState({ active: key })
    }

    render() {

        const keys = [1, 2, 3, 4, 5, 6]

        const style = {
            position: 'relative',
            width: '100%',
            // height: '90%',
            height: '800px',
        };

        const tabs = keys.map(x => (
            <TabPane tab={"plot " + x.toString()} key={x.toString()}>
                <div id={"plot " + x.toString()} className="dygraph" style={style}>
                    plot {x}
                </div>
            </TabPane>
        ))

        const el = (
            <Tabs onChange={this.active.bind(this)} type="card" activeKey={this.state.active}>
                <TabPane tab="data" key="0">
                    <Trees tabKeys={keys} activeTab={this.active.bind(this)} />
                    <div id="plot 0"></div>
                </TabPane>
                {tabs}
            </Tabs>
        )
        return el
    }
}

export { Tab }; 