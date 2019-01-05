import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getProductBySell, getProductByArticle } from '../../store/actions/';
import HomeSlider from './HomeSlider';
import HomPromotions from './HomPromotions';
import CardBlock from '../UI/CardBlock/';
import LinearProgress from '@material-ui/core/LinearProgress';

class Home extends Component {
    componentDidMount() {
        this.props.dispatch(getProductBySell());
        this.props.dispatch(getProductByArticle());
    }

    render() {
        return (
            <React.Fragment>
                <HomeSlider />
                <div className="container">
                    {this.props.productBySell.length > 0 ?                           
                        <CardBlock 
                            list={this.props.productBySell}
                            title="Best Selling Guitar"
                        />
                        :
                        <LinearProgress />
                    }
                </div> 
                <HomPromotions />
                <div className="container">
                    {this.props.productByArrival.length > 0 ?           
                        <CardBlock 
                            list={this.props.productByArrival}
                            title="New Arrival"
                        />
                        :
                        <LinearProgress />
                    }
                </div> 
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        productBySell: state.product.productBySell,
        productByArrival: state.product.productByArrival
    }
};

export default connect(mapStateToProps)(Home);