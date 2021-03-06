import React from 'react';

import CardBlockShop from '../UI/CardBlockShop/';

const LoadMoreProducts = (props) => {
    return (
        <div>
            <div>
                <CardBlockShop
                    grid={props.grid}
                    list={props.products}
                />
            </div>
            {props.size > 0 && props.size >= props.limit ?
                <div className="load_more_container">
                    <span onClick={() => props.loadMore()}>
                        {!props.loading ? 'Load More' : 'Loading...'}
                    </span>
                </div>
                : null
            }
        </div>
    );
};

export default LoadMoreProducts;