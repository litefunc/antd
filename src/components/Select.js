import React from 'react'
import { Select as Sel } from 'antd';
import { Url } from '../requests/api'

const Option = Sel.Option;


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
            value: '',
        }
    }

    componentDidMount() {
        fetch(Url('ids/list'))
            .then(res => res.json())
            .then(response => this.setState({ data: response.ids }))
            .catch(error => console.error('Error:', error))
    }

    handleChange(v) {
        this.setState({ value: v })
        console.log(`selected ${v}`);
        this.props.onChange(v)
    }

    selected() {
        return 1
    }

    render() {
        const opts = this.state.data.map(x => <Option key={x} value={x}>{x}</Option>)

        const el = (

            <Sel
                showSearch
                style={{ width: 200 }}
                placeholder="Select a company"
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
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