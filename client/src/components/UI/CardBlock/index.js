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
        <div className="card_block">
            <div className="container">
                {props.title ? <div className="title">{props.title}</div> : null}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    {renderCartHandler()}
                </div>
            </div>
        </div>
    );
};

export default CardBlock;