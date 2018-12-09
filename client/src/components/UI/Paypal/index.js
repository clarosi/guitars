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
            //console.log('onSuccess: ', JSON.stringify(payment));
            this.props.transSuccess(payment);
            // {
            //     "paid":true,
            //     "cancelled":false,
            //     "payerID":"LWC9BGBGK6DCG",
            //     "paymentID":"PAY-7GM09411KV1396139LQGN6MI",
            //     "paymentToken":"EC-9VY88976PW171740P",
            //     "returnUrl":"https://www.sandbox.paypal.com/?paymentId=PAY-7GM09411KV1396139LQGN6MI&token=EC-9VY88976PW171740P&PayerID=LWC9BGBGK6DCG",
            //     "address":{"recipient_name":"test buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},
            //     "email":"clarosian-buyer@yahoo.com"
            // }
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