import React from 'react';
import CartItem from './CartItem';

const Card = () => {
    const listCard = [
        { 'taskName': "Hello" },
        { 'taskName': "ReactJs" },
        { 'taskName': "Redux" },
    ];

    return (
        <ul>
            {listCard.map((item) => {
                <CartItem cartItem={item}></CartItem>
            })}
        </ul>
    )
}

export default Card;
y