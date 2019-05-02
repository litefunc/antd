import React from 'react'
import Dygraph from 'dygraphs';
import { Url } from '../requests/api'
import { transpose } from '../funcs/array'
import { normalize } from '../funcs/math'


class Graph {

    constructor(div, id, cols, setup, normalized) {
        this._div = div;
        this._id = id;
        this._cols = cols;
        this._setup = setup;
        this.normalized = normalized;
    }

    graph() {
        console.log(this._graph);
        return this._graph;
    }

    async plot() {
        try {
            const res = await postData(this._id, this._cols);
            this._data = res.data;
            this._setup();
            const g = NewDygraph(this._div, res.data, res.labels);
            this._graph = g;
            if (this.normalized()) {
                await this.normalize();
            }

        } catch (e) {
            console.error('Error:', e);
        }
    }

    async rawData() {
        try {
            if (this._data != undefined) {
                this._graph.updateOptions({ 'file': this._data })
                return
            }

        } catch (e) {
            console.error('Error:', e);
        }
    }

    async normalize() {
        try {

            if (this._data_normalized != undefined) {
                this._graph.updateOptions({ 'file': this._data_normalized })
                return
            }

            if (this._data != undefined) {
                const tr = transpose(this._data);
                const date = tr[0]
                let data = [date]
                for (let row of tr.slice(1)) {
                    let n = normalize(row)
                    data.push(n)
                }

                this._data_normalized = transpose(data);
                this._graph.updateOptions({ 'file': this._data_normalized })
            }

        } catch (e) {
            console.error('Error:', e);
        }
    }

}


function NewDygraph(div, data, labels) {

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

async function postData(id, cols) {
    return fetch(Url('data/list'), {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({ id: id, cols: cols }), // data can be `string` or {object}!
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
}

async function dygraph(x) {

    try {
        const res = await postData(x.id, x.cols)
        x.setup()
        const g = NewDygraph(x.div, res.data, res.labels)
        x.setGraph(g)
    } catch (e) {
        console.error('Error:', e)
    }

}



export { dygraph, Graph }