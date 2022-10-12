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

// import faker from 'faker';


// const config = {
//     type: 'bar',
//     // data: data,
//     options: {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Chart.js Combined Line/Bar Chart'
//             }
//         }
//     },
// };

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
        x: {
            stacked: true}
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

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


const filterQuantity = (arr, labels, mult, min_val) => {
    return arr.slice(0, labels.length).map((v) => v !== 0 ? [min_val, v * mult] : v * mult)
}

const Graph = ({labels=[], offs=[], ecos=[], comforts=[], values=[]}) => {

    const max_val = 7
    const min_val = -1
    console.log("values", values)
    console.log(max_val)
    const comforts_slice = filterQuantity(comforts, labels, max_val, min_val)
    const offs_slice = filterQuantity(offs, labels, max_val, min_val)
    const ecos_slice = filterQuantity(ecos, labels, max_val, min_val)


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
            },
            {
                type: 'bar',
                label: 'Offs',
                backgroundColor: 'rgb(230, 230, 30, 0.3)',
                data: offs_slice,
                borderColor: 'white',
                borderWidth: 2,
            },
            {
                type: 'bar',
                label: 'Comforts',
                backgroundColor: 'rgb(10, 60, 235, 0.3)',
                data: comforts_slice,
            },
            {
                type: 'bar',
                label: 'Ecos',
                backgroundColor: 'rgb(30, 230, 30, 0.3)',
                data: ecos_slice,
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