import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getSiteInfo } from '../../store/actions/';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LinearProgress from '@material-ui/core/LinearProgress';

class Layout extends Component {
    componentDidMount() {
        if (!this.props.siteData.siteInfo) {
            this.props.dispatch(getSiteInfo());
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                {this.props.children}
                {this.props.siteData.siteInfo ? <Footer siteInfo={this.props.siteData.siteInfo} /> :<LinearProgress />}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        siteData: state.site.siteData
    };
};

export default connect(mapStateToProps)(Layout);