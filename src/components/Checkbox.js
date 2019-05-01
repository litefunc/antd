import React from 'react'
import { Checkbox as Box } from 'antd';


class Checkbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: '',
        }
    }

    onChange(e) {
        this.setState({ checked: e.target.checked })
        console.log(`checked = ${e.target.checked}`);
        this.props.onChange(e)
    }

    render() {

        const el = (
            <Box onChange={this.onChange.bind(this)}>normalize</Box>
        )
        return el;
    }
}

export { Checkbox }