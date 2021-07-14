import { React, useState } from 'react';
import CardForm from './CardForm';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from './slice';

const CardItem = (props) => {
    const [editingCard, setEditing] = useState(false);
    const dispatch = useDispatch();
    const handleClick = (e) => {
        setEditing(true);
    }

    /* 
    * Handle Edit Card
    */
    const handleEditCard = (value) => {
        if (value) {
            dispatch(editTask({ "value": value, "id": props.no }));
        }
        setEditing(false);
    }

    /* 
    * Handle Delete Card
    **/
    const handleDeleteCard = () => {
        setEditing(false);
        dispatch(deleteTask(props.no));
    }

    const { cardItem } = props;
    return (
        <li className="cardItem">
            {!editingCard &&
                <span onClick={(e) => handleClick(e)}>{cardItem.taskName}</span>
            }
            {editingCard &&
                <CardForm taskName={cardItem.taskName}
                    handleEditCard={(value) => handleEditCard(value)}
                    handleDeleteCard={() => handleDeleteCard()}
                    isEditing>
                </CardForm>
            }
        </li>
    );
}

export default CardItem;

/* <ul className="card">
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
    </div> */