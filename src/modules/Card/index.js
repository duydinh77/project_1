import { Button } from 'antd';
import { React, useState } from 'react';
import CardForm from './CardForm';
import CardItem from './CardItem';

const Card = () => {
    const [isAddingCard, setIsAddingCard] = useState(false)
    const listCard = [
        { 'taskName': "Hello" },
        { 'taskName': "ReactJs" },
        { 'taskName': "Redux" },
    ];

    // Handle click add a card
    const handleAddCardClick = (e) => {
        setIsAddingCard(true);
    }

    const handleCardClick = () => {
        setIsAddingCard(false);
    }

    return (
        <div>
            <ul className="card">
                {listCard.map((item) => {
                    return <CardItem cardItem={item}></CardItem>
                })}
            </ul>
            <div>
                {!isAddingCard &&
                    <Button type="link" block onClick={(e) => handleAddCardClick(e)}> Add a card </Button>
                }
                {isAddingCard &&
                    <CardForm handleCardClick={handleCardClick} isAdding></CardForm>
                }
            </div>
        </div >
    )
}

export default Card;