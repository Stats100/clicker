import React, { useState, useEffect } from 'react';
import { HighchartsChart, Chart, XAxis, YAxis, Title, LineSeries, Tooltip, HighchartsProvider } from 'react-jsx-highcharts';
import Highcharts from 'highcharts';
import OdometerComponent from './Odometer'; // Import the Odometer component
import ButtonComponent from './Button';

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
    const [odometerValue, setOdometerValue] = useState(0); // State to hold the odometer value

    useEffect(() => {
        const fetchData = async () => {
            try {
                // TODO: Change to "/clicks" when the API is set up
                const response = await fetch('/api/clicks');
                const jsonData = await response.json();

                const newDataPoint = {
                    x: new Date().getTime(),
                    y: jsonData.clicks,
                };

                // 60 minutes = 3600 seconds, however 1 request every 2 seconds = 1800 datapoints for an hour
                // Minus 1 for 1799 because I don't know, JavaScript moment
                setData(prevData => [...prevData.slice(-1799), newDataPoint]);

                // Update the odometer value
                setOdometerValue(jsonData.clicks);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (fetchClicks) {
            fetchData();
            const interval = setInterval(fetchData, 2000);
            return () => clearInterval(interval);
        } else if (clientData) {
            setData(clientData);
            // If client data is provided, set the odometer value
            if (clientData.length > 0) {
                setOdometerValue(clientData[clientData.length - 1].y);
            }
        }
    }, [fetchClicks, clientData]);

    return (
        <div>
            {/* Render the Odometer component with the current odometer value */}
            <OdometerComponent value={odometerValue} />

            <br /><br />
            <ButtonComponent />

            {/* Render the Highcharts chart */}
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
                            color={'rgb(136, 58, 234)'}
                            lineWidth={5}
                        />
                    </YAxis>
                </HighchartsChart>
            </HighchartsProvider>
        </div>
    );
};

export default CustomChart;
