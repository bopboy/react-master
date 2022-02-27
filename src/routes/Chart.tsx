import React from 'react';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts'
import { stableValueHash } from 'react-query/types/core/utils';

interface IHistorical {
    time_open: string
    time_close: string
    open: number
    high: number
    low: number
    close: number
    volume: number
    market_cap: number
}
interface ChartProps {
    coinId: string
}
function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
    return <div>{isLoading ? "Loading chart..." :
        <ApexChart
            type="line"
            series={[
                { name: 'Price', data: data?.map(price => price.close) },
            ]}
            options={{
                theme: { mode: 'dark' },
                chart: {
                    height: 300,
                    width: 500,
                    toolbar: { show: false },
                    background: "transparent"
                },
                grid: { show: true },
                stroke: {
                    curve: "smooth",
                    width: 5
                },
                yaxis: { show: false },
                xaxis: {
                    axisBorder: { show: false },
                    axisTicks: { show: true },
                    labels: { show: true },
                    type: "datetime",
                    categories: data?.map(price => price.time_close)
                },
                fill: {
                    type: "gradient",
                    gradient: { gradientToColors: ["blue"], stops: [0, 100] }
                },
                colors: ["#0fbcf9"],
                tooltip: {
                    y: {
                        formatter: value => `$${value.toFixed(2)}`
                    }
                }
            }}
        />}</div>;
}

export default Chart;
