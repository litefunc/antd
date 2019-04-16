import React from 'react'
import Button from 'antd/lib/button';
import { TreeSelect } from 'antd';
import { Select } from './Select';
import { Url } from '../requests/api'

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const treeData = [
    {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
            }
        ],
    },
    {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
            },
            {
                title: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
            },
            {
                title: 'Child Node5',
                value: '0-1-2',
                key: '0-1-2',
            }
        ],
    }
];


function node(x) {
    return { title: x, value: x, key: x }
}

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: [], // the selected nodes' values
        }
    }

    componentDidMount() {
        fetch(Url('cols/list'))
            .then(res => res.json())
            .then(response => this.setState({ data: response.cols.map(x => node(x)) }))
            .catch(error => console.error('Error:', error))
    }

    onChange = (value) => {
        console.log('onChange ', value);
        this.setState({ value });

        // console.log(...this.state.data);
    }

    render() {
        const tProps = {
            treeData: this.state.data,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
                width: 300,
            },
        };
        return <TreeSelect {...tProps} />;
    }
}

class Tree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: [], // the selected nodes' values
        }
    }

    onChange = (value) => {
        console.log('onChange ', value);
        this.setState({ value });
        this.props.onChange(this.props.n, value)
    }

    render() {
        const tProps = {
            treeData: this.props.data,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
                width: 300,
            },
        };
        return <TreeSelect {...tProps} />;
    }
}

class Trees extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selected: <Select />,
            trees: {},
        }
    }

    componentDidMount() {
        fetch(Url('cols/list'))
            .then(res => res.json())
            .then(response => this.setState({ data: response.cols.map(x => node(x)) }))
            .catch(error => console.error('Error:', error))
    }

    plot() {
        console.log(this.state.selected.selected())
    }

    setTrees(k, v) {
        this.setState({ trees: this.setTreeValue(this.state.trees, k, v) })
        console.log(this.state.trees);
    }

    setTreeValue(trees, k, v) {
        trees[k] = v
        return trees
    }

    render() {
        const trees = [0, 1, 2, 3, 4, 5].map(x => <Tree data={this.state.data} key={x.toString()} n={x.toString()} onChange={this.setTrees.bind(this)} />)
        const el = (
            <div>
                <div>
                    {this.state.selected}
                    <Button type="primary">Plot</Button>
                    <Button type="danger">Plot All Again</Button>
                </div>
                <div>{trees}</div>
            </div>
        );
        return el;
    }
}

export { Trees, Demo }