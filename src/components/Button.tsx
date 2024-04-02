import React, { useEffect } from 'react';
import './Button.css';

const ButtonComponent = () => {
    useEffect(() => {
        const clickButton = document.getElementById('clickButton');

        if (clickButton) {
            clickButton.addEventListener('click', clickRequest);
        }

        function clickRequest() {
            fetch('/api/clicked');
        }

        return () => {
            if (clickButton) {
                clickButton.removeEventListener('click', clickRequest);
            }
        };
    }, []);

    return (
        <div>
            <button id="clickButton" type="button">
                <strong>Click Me!</strong>
            </button>
        </div>
    );
};

export default ButtonComponent;
