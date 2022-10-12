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



const Graph = ({labels = []}) => {

    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: 'Dataset 1',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: labels.map(() => 100),
            },
            {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: 'rgb(75, 192, 192, 0.2)',
                data: labels.map(() => 50),
                borderColor: 'white',
                borderWidth: 2,
            },
            {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: 'rgb(53, 162, 235, 0.2)',
                data: labels.map(() => 30),
            },
        ],
    };


    return (
        <>
            <Chart
                options={{
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
                }}
                type={"bar"}
                data={data}/>
        </>
    )
}

export default Graph