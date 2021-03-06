import React, { Component } from 'react';

import { connect } from 'react-redux';
import { frets, prices } from '../../shared/utils/numberConstants';
import {
    getProductBrands, 
    getProductWoods,
    getProductsToShop
} from '../../store/actions/';
import CollapseCheckBox from '../UI/CollapseCheckBox/';
import CollapseRadio from '../UI/CollapseRadio/';
import PageTop from '../UI/PageTop/';
import LoadMoreProducts from './LoadMoreProducts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';

class Shop extends Component {
    _isMounted = false;

    state = {
        isLoading: false,
        isLoadMore: false,
        grid: '',
        limit: 6,
        skip: 0,
        pricesCategory: 'price',
        filters: {
            brand: [],
            wood: [],
            frets: [],
            price: []
        },
        collapseCheckBoxes: [
            {initState: true, title: 'brand', list: this.props.productBrands},
            {initState: true, title: 'wood', list: this.props.productWoods},
            {initState: false, title: 'frets', list: frets}
        ]
    };

    componentWillUnMount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        this.props.dispatch(getProductBrands())
        .then(() => {
            const newCollapseCheckBoxes = Object.assign([], this.state.collapseCheckBoxes);
            newCollapseCheckBoxes[0].list = this.props.productBrands;

            if (this._isMounted) this.setState({collapseCheckBoxes: newCollapseCheckBoxes});
        });

        this.props.dispatch(getProductWoods())
        .then(() => {
            const newCollapseCheckBoxes = Object.assign([], this.state.collapseCheckBoxes);
            newCollapseCheckBoxes[1].list = this.props.productWoods;

            if (this._isMounted) this.setState({collapseCheckBoxes: newCollapseCheckBoxes});
        });

        this.setState({isLoading: true});
        this.props.dispatch(getProductsToShop({
            limit: this.state.limit,
            skip: this.state.skip,
            filters: this.state.filters
        }))
        .then(() => {
            if (this._isMounted) this.setState({isLoading: false});
        })
        .catch(() => {
            if (this._isMounted) this.setState({isLoading: false});
        });
    }

    filterHandler = (filters, category) => {
        const newFilters = Object.assign({}, this.state.filters);
        newFilters[category] = filters;

        if (category === this.state.pricesCategory) {
            const priceArray = this.priceChangeHandler(filters);
            newFilters[category] = priceArray;
        }

        this.renderFilteredResultsHandler(newFilters);
        this.setState({filters: newFilters});
    }

    priceChangeHandler = (value) => {
        let priceArray = [];
        for (const key in prices) {
            if (prices[key]._id === parseInt(value, 10)) 
                priceArray = prices[key].array;
        }

        return priceArray;
    }

    renderFilteredResultsHandler = (filters) => {
        this.setState({isLoading: true});

        let skip = this.state.skip;
        for (const key in filters) {
            if (filters[key].length > 0) skip = 0;    
        }

        this.props.dispatch(getProductsToShop({
            skip,
            limit: this.state.limit,
            filters: filters
        }))
        .then(() => {
 
            this.setState({
                isLoading: false,
                skip: 0
            });
        })
        .catch(() => {
            this.setState({isLoading: false});
        });
    }

    loadMoreHandler = () => {
        let skip = this.state.skip + this.state.limit;
        const prevData = this.props.toShopArticles;

        this.setState({isLoadMore: true});

        this.props.dispatch(getProductsToShop(
            {
                skip,
                limit: this.state.limit,
                filters: this.state.filters
            },
            prevData
        ))
        .then(() => {
            this.setState({
                skip,
                isLoadMore: false
            });
        });
    }

    gridHandler = () => {
        this.setState(prevState => ({
            grid: !prevState.grid ? 'grid_bars' : ''
        }))
    }

    render() {
        return (
            <div className="row">
                <PageTop title="Browse Products" />
                <div className="container">
                    <div className="row shop_wrapper">
                        <div className="col-md-2">
                            {this.state.collapseCheckBoxes.map(item => (                        
                                <CollapseCheckBox
                                    key={item.title}
                                    initState={item.initState}
                                    title={item.title}
                                    list={item.list}
                                    filterHandler={(filters) => this.filterHandler(filters, item.title)}
                                />
                            ))}
                            <CollapseRadio
                                initState={false}
                                title={this.state.pricesCategory}
                                list={prices}
                                filterHandler={(filters) => this.filterHandler(filters, this.state.pricesCategory)}
                            />
                        </div>
                        <div className="col-md-10">
                            {!this.state.isLoading ?
                                <React.Fragment>
                                    <div className="shop_options">
                                        <div className="shop_grids clear">
                                            <div
                                                className={'grid_btn active'}
                                                onClick={this.gridHandler}
                                            >
                                                <FontAwesomeIcon icon={this.state.grid ? faBars : faTh} />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div>
                                        <LoadMoreProducts
                                            grid={this.state.grid}
                                            limit={this.state.limit}
                                            size={this.props.toShopSize}
                                            products={this.props.toShopArticles}
                                            loading={this.state.isLoadMore}
                                            loadMore={() => this.loadMoreHandler()}
                                        />
                                    </div>
                                </React.Fragment>
                                :
                                <CircularProgress 
                                    size={70}
                                    style={{
                                        marginTop: '10%',
                                        marginLeft: '50%'
                                    }} 
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productBrands: state.product.productBrands,
        productWoods: state.product.productWoods,
        toShopArticles: state.product.toShopArticles,
        toShopSize: state.product.toShopSize
    };
};

export default connect(mapStateToProps)(Shop);