import React from 'react'
import Dygraph from 'dygraphs';
import { Url } from '../requests/api'

function NewDygraph(setup, div, data, labels) {
    setup()
    let d = data.map(x => {
        x[0] = new Date(x[0])
        return x
    })
    console.log(d);
    return new Dygraph(div, d, { labels: labels });
    // return new Dygraph(div, data, opt);
}

function dygraph(x) {
    fetch(Url('data/list'), {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(x), // data can be `string` or {object}!
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        // .then(response => console.log('Success:', response))
        .then(response => NewDygraph(x.setup, x.div, response.data, response.labels));
}

export { dygraph }