import { React, useState } from 'react';

const CardItem = (props) => {
    const [editing, setEditing] = useState(false);
    const handleClick = (e) => {
        setEditing(true);
    }

    const handleSaveClick = (e) => {
        setEditing(false);
    }

    const { cardItem } = props;
    return (
        <li className="cardItem">
            {!editing &&
                <span onClick={(e) => handleClick(e)}>{cardItem.taskName}</span>
            }
            {editing &&
                <div>
                    <input type="text" defaultValue={cardItem.taskName} />
                    <button type="button" onClick={(e) => handleSaveClick(e)}>Save</button>
                </div>
            }
        </li>
    );
}

export default CardItem;