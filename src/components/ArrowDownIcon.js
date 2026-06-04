import React from 'react';
import arrowImg from '../assets/arrow-down.png'; // adjust the path as needed

const ArrowDownIcon = (props) => (
    <img
        src={arrowImg}
        alt="Arrow"
        style={{ cursor: 'pointer', background: 'transparent', ...props.style }}
        onClick={props.onClick}
    />
);

export default ArrowDownIcon;
