import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

interface Props {
    primes: Number[];
  }

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Firt 1000 Prime Numbers',
        },
    },
};

const labels:Number[] = [];
for (let i=0; i<1000; i++){
    labels.push(i)
}

export function AreaChart(props:Props) {

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Primes',
                data: props.primes,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    
    return <Line options={options} data={data} />;
}
