import { React, useState } from 'react';

const CartItem = (props) => {
    const [editing, setEditing] = useState(false);

    const {cartItem} = props;
    return (
        <li>
            {!editing &&
                <span>{cartItem.name}</span>
            }
        </li>
    );
}

export default CartItem;