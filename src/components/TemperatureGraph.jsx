import '../styles/app.scss';
import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { HOURS_PER_DAY } from '../config/constants';

ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);


export default function TemperatureGraph({hourly, firstTimestamp, selectedDataIndex, setSelectedDataIndex, offsetDifference, windowWidth}) {
    const lastIndex = firstTimestamp + HOURS_PER_DAY - 1;
    let hours = [], values = [];

    for (let k = firstTimestamp; k <= lastIndex; k++) {
        const date = new Date(hourly.time[k]);
        date.setHours(date.getHours() + offsetDifference);
        const xValue = date.toISOString();
        hours[k - firstTimestamp] = xValue;
        values[k - firstTimestamp] = hourly.temperature_2m[k];
    }

    //стили данных
    const data = {
        labels: hours,
        datasets: [
            {
                data: values,
                borderColor: 'rgba(22, 46, 181, 1)',
                backgroundColor: 'rgba(22, 46, 181, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: hours.map((_, index) =>
                    index === selectedDataIndex ? "orange" : "rgba(22, 46, 181, 1)"
                ),
                pointBorderColor: "rgba(22, 46, 181, 1)",
                pointRadius: hours.map((_, index) =>
                    index === selectedDataIndex ? 6 : 4
                ),
                pointHoverRadius: 8,
            },
        ],
    };

    
    function handleClick(event, _, chart) {
        const points = chart.getElementsAtEventForMode(event.native, "nearest", { intersect: true }, true);
        if (points.length > 0) {
            const firstPoint = points[0];
            const dataIndex = firstPoint.index;
            setSelectedDataIndex(dataIndex);
        }
    };

    function handleHover(event, elements) {
        elements.length > 0 ? event.native.target.style.cursor = "pointer" : event.native.target.style.cursor = "default"; 
    };

    //прочие стили
    const options = {
        onClick: handleClick,
        onHover: handleHover,
        animation: true,
        responsive: true,
        maintainAspectRatio: windowWidth <= 500 ? false : true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour',
                    displayFormats: {
                        hour: 'HH:mm',
                    },
                    tooltipFormat: 'HH:mm',
                },
                ticks: {
                    font: {
                        size: 16,
                    },
                    maxTicksLimit: 9,
                },
            },
            y: {
                ticks: {
                    stepSize: 1,
                    maxTicksLimit: 8,
                    font: {
                        size: 16,
                    }
                },
            },
        },
    };

    return (
        <div className='temp-graph'>
            <Line data={data} options={options} />
        </div>   
    )
}