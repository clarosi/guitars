import React from "react";

import UserLayout from "../../../../hoc/Layout/UserLayout";
import ManageBrands from './ManageBrands';
import ManageWoods from './ManageWoods';

const ManageCategories = () => {
  return (
    <UserLayout>
        <div>
            <ManageBrands />
            <ManageWoods />
        </div>
    </UserLayout>
  );
};

export default ManageCategories;
