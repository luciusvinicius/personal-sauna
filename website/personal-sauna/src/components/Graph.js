import React from "react";
import { Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';

const options = {
    responsive: true,

    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Combined Line/Bar Chart'
        }
    },
    scales: {
        // x: {
        //     stacked: true
        // },
        y: {
            position: "right",
            // stacked: true
        },
        type_y: {
            grid: {
               drawOnChartArea: false
            },
            // stacked: true
        }
    }
}

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);


const filterQuantity = (arr, labels, scale) => {
    // return arr.slice(0, labels.length).map((v) => v !== 0 ? [min_val, v * mult] : v * mult)
    return arr.slice(0, labels.length).map((v) => v/scale)

}

const Graph = ({labels=[], offs=[], ecos=[], comforts=[], values=[]}) => {

    if (offs.length === 0 || ecos.length === 0 || comforts.length === 0) {
        return <p>Loading</p>
    }
    const scale = offs[0] + ecos[0] + comforts[0]
    console.log("values", values)

    const comforts_slice = filterQuantity(comforts, labels, scale)
    const offs_slice = filterQuantity(offs, labels, scale)
    const ecos_slice = filterQuantity(ecos, labels, scale)


    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: 'Temperature',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: labels.map((_, i) => values[i]),
                // yAxisID: 'type_y'
            },
            {
                type: 'bar',
                label: 'Offs',
                backgroundColor: 'rgb(230, 230, 30, 0.3)',
                data: offs_slice,
                yAxisID: 'type_y',
                barThickness: 'flex',
                barPercentage: 1,
                categoryPercentage: 1,
            },
            {
                type: 'bar',
                label: 'Comforts',
                backgroundColor: 'rgb(10, 60, 235, 0.3)',
                data: comforts_slice,
                yAxisID: 'type_y',
                barThickness: 'flex',
                barPercentage: 1,
                categoryPercentage: 1,
            },
            {
                type: 'bar',
                label: 'Ecos',
                backgroundColor: 'rgb(30, 230, 30, 0.3)',
                data: ecos_slice,
                yAxisID: 'type_y',
                barThickness: 'flex',
                barPercentage: 1,
                categoryPercentage: 1,
            },
        ],
    };


    return (
        <>
            <Chart
                options={options}
                type={"bar"}
                data={data}/>
        </>
    )
}

export default Graph