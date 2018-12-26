import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getSiteInfo } from '../../store/actions/';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class Layout extends Component {
    componentDidMount() {
        if (!this.props.siteData.siteInfo) {
            this.props.dispatch(getSiteInfo());
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="page_container">
                    {this.props.children}
                </div>
                {this.props.siteData.siteInfo ? <Footer siteInfo={this.props.siteData.siteInfo} /> :null }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        siteData: state.site.siteData
    };
};

export default connect(mapStateToProps)(Layout);