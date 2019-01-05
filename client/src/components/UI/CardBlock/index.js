import React from 'react';

import Card from './Card';

const CardBlock = (props) => {
    const renderCartHandler = () => (
        props.list ?
            props.list.map(card => (
                <Card
                    key={card._id}
                    {...card}    
                />

            ))
            :
            null
    )

    return (
        <div className="row card_block">
            <div className="col-sm-12">
                {props.title ? <div className="title">{props.title}</div> : null}
                <div className="row">
                    {renderCartHandler()}
                </div>
            </div>
        </div>
    );
};

export default CardBlock;