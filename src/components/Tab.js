import React from 'react'
import { Tabs } from 'antd';
import { Trees } from './TreeSelect'

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

function Tab() {
    const el = (
        <Tabs onChange={callback} type="card">
            <TabPane tab="data" key="1"><Trees /></TabPane>
            <TabPane tab="plot 1" key="2">plot 1</TabPane>
            <TabPane tab="plot 2" key="3">plot 2</TabPane>
            <TabPane tab="plot 3" key="4">plot 3</TabPane>
        </Tabs>
    )
    return el
}

export { Tab }; 