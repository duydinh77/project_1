import React from 'react';

const Card = () => {
    const listCard = [
        { 'taskName': "Hello"},
        { 'taskName': "ReactJs"},
        { 'taskName': "Redux"},
    ];

    return (
        <ul>
            {listCard.map((item) => {
                return <li>{item.taskName}</li>
            })}
        </ul>
    )
}

export default Card;
