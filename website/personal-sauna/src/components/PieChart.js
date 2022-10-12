import React from "react";
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
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




const PieChart = ({values}) => {

    console.log(values)

    const data = {
        labels: [
          'Off',
          'Eco',
          'Comfort'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: values,
          backgroundColor: [
            'rgb(230, 230, 30, 0.3)',
            'rgb(10, 60, 235, 0.3)',
            'rgb(30, 230, 30, 0.3)'
          ],
          hoverOffset: 4
        }]
      };



    return (
        <>
            <Chart
                type={"pie"}
                data={data}
                width={"10%"}
                options={{ maintainAspectRatio: false }}
                />
        </>
    )
}

export default PieChart