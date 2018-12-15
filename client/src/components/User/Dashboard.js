import React from 'react';

import { userProfileRoute } from '../../shared/utils/routeConstants';
import UserLayout from '../../hoc/Layout/UserLayout';
import PurchaseHistory from '../UI/PurchaseHistory/';
import CustomButton from '../UI/CustomButton/';

const Dashboard = ({userData}) => {
    return (
        <UserLayout>
            <div>
                <div className="user_nfo_panel">
                    <h2>User Information</h2>
                    <div>
                        <span>{userData.user.firstname}</span>
                        <span>{userData.user.lastname}</span>
                        <span>{userData.user.email}</span>
                    </div>
                    <CustomButton 
                        type="link"
                        linkTo={userProfileRoute}
                        title="Edit account info"
                        addStyles={{margin: '10px 0 0 0'}}
                    />
                </div>
                {userData.user.history.length > 0 ?
                    <div className="user_nfo_panel">
                        <h2>Purchase History</h2>
                        <div className="user_product_block_wrapper">
                            <PurchaseHistory history={userData.user.history.reverse()} />
                        </div>
                    </div>
                    :null
                }
            </div>
        </UserLayout>
    );
};

export default Dashboard;