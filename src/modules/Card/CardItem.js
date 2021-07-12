import { React, useState } from 'react';
import CardForm from './CardForm';
import { useDispatch } from 'react-redux';
import { editTask } from './slice';

const CardItem = (props) => {
    const [editing, setEditing] = useState(false);
    const dispatch = useDispatch();
    const handleClick = (e) => {
        setEditing(true);
    }

    const handleEditCard = (value) => {
        dispatch(editTask(value));
        setEditing(false);
    }

    const { cardItem } = props;
    return (
        <li className="cardItem">
            {!editing &&
                <span add={(e) => handleClick(e)}>{cardItem.taskName}</span>
            }
            {editing &&
                <CardForm taskName={cardItem.taskName} handleEdit={() => handleEditCard()} isEditing></CardForm>
            }
        </li>
    );
}

export default CardItem;