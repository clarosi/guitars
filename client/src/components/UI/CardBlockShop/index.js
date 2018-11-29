import React from 'react';

import Card from '../CardBlock/Card';

const CardBlockShop = (props) => {
    const renderCardHandler = () => (
        props.list.length > 0 ?
            props.list.map(card => (
                <Card
                    key={card._id}
                    grid={props.grid}
                    {...card}
                />
            ))
            :
            null
    )

    return (
        <div className="card_block_shop">
           <div>
                <div>
                    {props.list.length === 0 ? <div className="no_result">Sorry, no result</div> : null}
                    {renderCardHandler()}
                </div>
           </div> 
        </div>
    );
};

export default CardBlockShop;