import React from 'react';
import '../assets/css/Card.css';

const CardImage = ({ imageUrl, title, subtitle, height, width }) => {
return (
    <div className='cardContainer'>
        <div className='card'
        style={{
            height: height,
            width: width
        }}>
            <img
            src={imageUrl}
            className="cardImg"
            style={{
                position: 'relative',
                width: '100%',
            }}
            />
            <p className='title'>{title}</p>
            <p className='subtitle'>{subtitle}</p>
                {/* <div className="overlay">
                    <p className="title">{title}</p>
                    <p className="subtitle">{subtitle}</p>
                </div> */}
        </div>
    </div>
);
};

export default CardImage;