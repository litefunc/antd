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
    const opt = {
        labels: labels,
        showRangeSelector: true,
        interactionModel: Dygraph.defaultInteractionModel,
        legend: 'follow',
        labelsSeparateLines: true,
        connectSeparatedPoints: false,
        highlightSeriesOpts: {
            strokeWidth: 2,
            strokeBorderWidth: 1,
            highlightCircleSize: 3
        }
    }
    return new Dygraph(div, d, opt);
}

function dygraph(x) {
    fetch(Url('data/list'), {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(x), // data can be `string` or {object}!
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        // .then(response => console.log('Success:', response))
        .then(response => NewDygraph(x.setup, x.div, response.data, response.labels))
        .then(g => x.setGraph(g))
        .catch(error => console.error('Error:', error));
}

export { dygraph }