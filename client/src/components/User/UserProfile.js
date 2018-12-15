import React from 'react';

import UserLayout from '../../hoc/Layout/UserLayout';
import UpdateProfile from './UpdateProfile';

const UserProfile = () => {
    return (
        <UserLayout>
            <div className="user_nfo_panel">
                <h2>Profile</h2>
                <UpdateProfile />
            </div>
        </UserLayout>
    );
};

export default UserProfile;