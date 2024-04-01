import React, { useState, useEffect } from 'react';
import {
    HighchartsChart,
    Chart,
    XAxis,
    YAxis,
    Title,
    LineSeries,
    Tooltip,
    HighchartsProvider,
} from 'react-jsx-highcharts';
import Highcharts from 'highcharts';

interface DataPoint {
    x: number;
    y: number;
}

interface CustomChartProps {
    fetchClicks?: boolean;
    clientData?: DataPoint[];
}

const CustomChart = ({ fetchClicks, clientData }: CustomChartProps) => {
    const [data, setData] = useState<DataPoint[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // TODO: Change to "/clicks" when the API is set up
                const response = await fetch('https://api-gc.galvindev.me.uk/clicks');
                const jsonData = await response.json();

                const newDataPoint = {
                    x: new Date().getTime(),
                    y: jsonData[0].row_count,
                };

                // 60 minutes = 3600 seconds, however 1 request every 2 seconds = 1800 datapoints for an hour
                // Minus 1 for 1799 because I don't know, JavaScript moment
                setData(prevData => [...prevData.slice(-1799), newDataPoint]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (fetchClicks) {
            fetchData();
            const interval = setInterval(fetchData, 1000);
            return () => clearInterval(interval);
        } else if (clientData) {
            setData(clientData);
        }
    }, [fetchClicks, clientData]);

    return (
        <HighchartsProvider Highcharts={Highcharts}>
            <HighchartsChart plotOptions={{}}>
                <Chart backgroundColor={'transparent'} />

                <Title style={{ color: '#fff' }}>Clicks</Title>
                <Tooltip
                    padding={10}
                    hideDelay={250}
                    shape='rect'
                    split
                    backgroundColor={'black'}
                    style={{ color: 'white' }}
                />
                <XAxis
                    tickColor={'#fff'}
                    gridLineColor={'#fff'}
                    minorGridLineColor={'#fff'}
                    lineColor={'#fff'}
                    labels={{ style: { color: '#fff' } }}
                    type='datetime'>
                </XAxis>
                <YAxis
                    id='number'
                    tickColor={'#fff'}
                    gridLineColor={'#fff'}
                    minorGridLineColor={'#fff'}
                    lineColor={'#fff'}
                    labels={{ style: { color: '#fff' } }}>
                    
                    <LineSeries
                        name='Row Count'
                        id='clicksChart'
                        data={data}
                    />
                </YAxis>
            </HighchartsChart>
        </HighchartsProvider>
    );
};

export default CustomChart;
