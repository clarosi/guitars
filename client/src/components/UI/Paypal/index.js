import React, { Component } from 'react';

import PaypalExpressBtn from 'react-paypal-express-checkout';
import { paypalToken } from '../../../shared/utils/stringConstants';

class Paypal extends Component {
    render() {
        const env = 'sandbox';
        const currency = 'USD';
        const total = this.props.toPay;

        const client = {
            sandbox: paypalToken,
            production: ''
        };

        const onSuccess = (payment) => {
            this.props.transSuccess(payment);
        };

        const onCancel = (data) => {
            this.props.transCanceled(data);
        };

        const onError = (err) => {
            this.props.transError(err);
        };

        return (
            <div>
                <PaypalExpressBtn
                    env={env} 
                    client={client} 
                    currency={currency} 
                    total={total} 
                    onError={onError} 
                    onSuccess={onSuccess} 
                    onCancel={onCancel}
                    style={{
                        size: 'medium'
                    }}
                />
            </div>
        );
    }
}

export default Paypal;