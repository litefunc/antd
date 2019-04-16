import React from 'react'
import { Tabs } from 'antd';
import { Trees } from './TreeSelect'

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

function Tab() {
    const tabs = [1, 2, 3, 4, 5].map(x => <TabPane tab={"plot " + x.toString()} key={x.toString()}>plot {x}</TabPane>)

    const el = (
        <Tabs onChange={callback} type="card">
            <TabPane tab="data" key="0">
                <Trees />
            </TabPane>
            {tabs}
        </Tabs>
    )
    return el
}

export { Tab }; 