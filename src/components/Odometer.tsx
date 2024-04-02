import React from 'react';
import Odometer from 'react-odometerjs';
import './Odometer.css';

const OdometerComponent = ({ value }: { value: number }) => {
    return <Odometer className='odometer' value={value} format="(,ddd)" />;
};

export default OdometerComponent;
