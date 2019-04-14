import React from 'react'
import { Select as Sel } from 'antd';
import { Url } from '../requests/api'

const Option = Sel.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}


class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        fetch(Url('ids/list'))
            .then(res => res.json())
            .then(response => this.setState({ data: response.ids }))
            .catch(error => console.error('Error:', error))
    }

    render() {
        const opts = this.state.data.map(x => <Option key={x} value={x}>{x}</Option>)

        const el = (

            <Sel
                showSearch
                style={{ width: 200 }}
                placeholder="Select a company"
                optionFilterProp="children"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {opts}
            </Sel>

        )
        return el;
    }
}


export { Select }