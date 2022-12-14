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
import Card from 'react-bootstrap/Card';

const generateOptions = (title="", isHourly=false) => {
    return {
        responsive: true,

        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `${title} in relation to time.`
            }
        },
        scales: {
            x: {
                grid: {
                    //lineWidth: isHourly ? 1 : 3,
                    drawOnChartArea: !isHourly,
                    display: false
                },
                title: {
                    display: true,
                    text: "Time"
                },
                stacked: isHourly,

            },
            y: {
                position: "right",
                title: {
                    display: true,
                    text: title
                },
                grid: {
                    //lineWidth: isHourly ? 1 : 3,
                    drawOnChartArea: !isHourly,
                    display: true
                },
            },
            type_y: {
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: "Heat Bomb Mode (%)"
                },
            }
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
    return arr.slice(0, labels.length).map((v) => v/scale)
}

const Graph = ({labels=[], offs=[], ecos=[], comforts=[], values=[], title='', isHourly=false, values2=[], title2='', stepped=false}) => {

    if (offs.length === 0 || ecos.length === 0 || comforts.length === 0) {
        return <p>Loading</p>
    }
    const scale = offs[0] + ecos[0] + comforts[0]

    const comforts_slice = filterQuantity(comforts, labels, scale)
    const offs_slice = filterQuantity(offs, labels, scale)
    const ecos_slice = filterQuantity(ecos, labels, scale)
    const options = generateOptions(title, isHourly)

    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: title,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: labels.map((_, i) => values[i]),
                stepped: stepped,

            },
        ],
    };

    if (values2.length !== 0){
        data.datasets.push({
            type: 'line',
            label: title2,
            borderColor: 'rgb(132, 99, 255)',
            borderWidth: 2,
            fill: false,
            data: labels.map((_, i) => values2[i]),
            stepped: stepped,
        })
    }

    data.datasets = data.datasets.concat([
        {
            type: 'bar',
            label: 'Off %',
            backgroundColor: 'rgb(30, 30, 30, 0.3)',
            data: offs_slice,
            yAxisID: 'type_y',
            barThickness: 'flex',
            barPercentage: 1,
            categoryPercentage: 1,
        },
        {
            type: 'bar',
            label: 'Comfort %',
            backgroundColor: 'rgb(10, 60, 235, 0.3)',
            data: comforts_slice,
            yAxisID: 'type_y',
            barThickness: 'flex',
            barPercentage: 1,
            categoryPercentage: 1,
        },
        {
            type: 'bar',
            label: 'Eco %',
            backgroundColor: 'rgb(30, 230, 30, 0.3)',
            data: ecos_slice,
            yAxisID: 'type_y',
            barThickness: 'flex',
            barPercentage: 1,
            categoryPercentage: 1,
        }
    ])


    return (
        <>
        <Card>
            <Chart
                options={options}
                type={"bar"}
                data={data}/>
        </Card>
        </>
    )
}

export default Graph