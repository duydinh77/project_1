import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import CardForm from './CardForm';
import CardItem from './CardItem';
import { addNewTask, editTask, deleteTask, taskSelector } from './slice';

const Card = () => {
    const [isAddingCard, setIsAddingCard] = useState(false);
    const dispatch = useDispatch();
    const listTask = useSelector(taskSelector);

    // Handle click add a card
    const handleAddCardClick = (e) => {
        setIsAddingCard(true);
    }

    const handleAddCard = (value) => {
        setIsAddingCard(false);
        dispatch(addNewTask(value));
    }

    return (
        <div>
            <ul className="card">
                {listTask.map((item, index) => {
                    return <CardItem key={index} no={index} cardItem={item}></CardItem>
                })}
            </ul>
            <div>
                {!isAddingCard &&
                    <Button type="primary" block onClick={(e) => handleAddCardClick(e)}> Add a card </Button>
                }
                {isAddingCard &&
                    <CardForm handleAddCard={(value) => handleAddCard(value)} isAdding></CardForm>
                }
            </div>
        </div >
    )
}

export default Card;