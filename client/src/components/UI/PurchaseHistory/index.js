import React from 'react';

import moment from 'moment';

const PurchaseHistory = (props) => {

    const showTbodyHandler = () => (
        props.history.map(item => (
            <tr key={item.paymentId}>
                <td>{moment(item.dateOfPurchase).format('DD/MM/YYYY')}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
            </tr>
        ))
    )

    return (
        <div className="history_blocks">
            <table>
                <thead>
                    <tr>
                        <th>Purchase Date</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {showTbodyHandler()}
                </tbody>
            </table>
        </div>
    );
};

export default PurchaseHistory;