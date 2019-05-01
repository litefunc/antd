import React from 'react'
import Button from 'antd/lib/button';
import { TreeSelect } from 'antd';
import { Select } from './Select';
import { Url } from '../requests/api'
import { dygraph, Graph } from "./Dygraph";

const SHOW_PARENT = TreeSelect.SHOW_PARENT;


class Test1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: [1, 2, 3], // the selected nodes' values
        }
    }

    getValue = () => {
        console.log('value ', this.state.value);
        return this.state.value
    }

    // render() {
    //     return;
    // }
}

class Trees extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selected: '',
            trees: {},
            graphs: {

            }
        }
    }

    componentDidMount() {
        fetch(Url('cols/list'))
            .then(res => res.json())
            .then(response => this.setState({ data: response.cols.map(x => node(x)) }))
            .catch(error => console.error('Error:', error))
    }

    selected(v) {
        this.setState({ selected: v })
        console.log(this.state.selected)
    }

    plot() {
        let t = new Test1();

        console.log(t.getValue());
        console.log(t.state);
        console.log(this.state.selected);
        console.log(this.state.trees);

        let trees = this.state.trees;
        for (let k of Object.keys(trees)) {
            console.log(k, trees[k])
            const o = {
                setup: () => this.props.activeTab(k),
                div: "plot " + k,
                id: this.state.selected.split(" ")[0],
                cols: trees[k],
                setGraph: (g) => {
                    this.setState({ graphs: this.setGraph(this.state.graphs, "plot " + k, g) });
                    console.log(this.state.graphs);
                },
            }
            // dygraph(o)
            let g = new Graph(o.div, o.id, o.cols, o.setup);
            g.plot();
            o.setGraph(g);

        }

    }

    setTrees(k, v) {
        this.setState({ trees: this.setTreeValue(this.state.trees, k, v) })
        console.log(this.state.trees);
    }

    setTreeValue(trees, k, v) {
        trees[k] = v
        return trees
    }

    setGraph(graphs, k, v) {
        graphs[k] = v
        return graphs
    }


    render() {
        const trees = this.props.tabKeys.map(x => <Tree data={this.state.data} key={x.toString()} n={x.toString()} onChange={this.setTrees.bind(this)} />)
        const el = (
            <div>
                <div>
                    <Select onChange={this.selected.bind(this)} />
                    <Button type="primary" onClick={this.plot.bind(this)}>Plot</Button>
                    <Button type="danger">Plot All Again</Button>
                </div>
                <div>{trees}</div>
            </div>
        );
        return el;
    }
}

function node(x) {
    return { title: x, value: x, key: x }
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



export { Trees }