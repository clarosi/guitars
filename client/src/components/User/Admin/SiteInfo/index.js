import React, { Component } from 'react';

import UserLayout from '../../../../hoc/Layout/UserLayout';
import ManageSiteInfo from './ManageSiteInfo';

class SiteInfo extends Component {
    render() {
        return (
            <UserLayout>
                <ManageSiteInfo />
            </UserLayout>
        );
    }
}

export default SiteInfo;