import React from 'react';

import Layout from './hoc/Layout/Layout';
import AuthCheck from './hoc/AuthCheck/';
import { Route, Switch } from 'react-router-dom';
import * as routes from './shared/utils/routeConstants';

import SiteInfo from './components/User/Admin/SiteInfo';
import AddProduct from './components/User/Admin/AddProduct';
import ManageCategories from './components/User/Admin/ManageCategories';

import Home from './components/Home/';
import Shop from './components/Shop/';
import RegisterLoginContainer from './containers/RegisterLogin/';
import Register from './components/RegisterLogin/Register';
import Dashboard from './components/User/Dashboard';
import PageNotFound from './components/UI/PageNotFound/';

const App = (props) => {
  return (
    <Layout>
      <Switch>
        <Route path={routes.adminSiteInfoRoute} component={AuthCheck(SiteInfo, true)} />
        <Route path={routes.adminAddProductRoute} component={AuthCheck(AddProduct, true)} />
        <Route path={routes.adminManageCategoriesRoute} component={AuthCheck(ManageCategories, true)} />

        <Route path={routes.userDashboardRoute} component={AuthCheck(Dashboard, true)} />

        <Route path={routes.registerLoginRoute} component={AuthCheck(RegisterLoginContainer, false)} />  
        <Route path={routes.registerRoute} component={AuthCheck(Register, false)} />

        <Route path={routes.shopRoute} component={AuthCheck(Shop, null)} />
        <Route exact path="/" component={AuthCheck(Home, null)} />
        <Route component={PageNotFound} />
      </Switch>
    </Layout>
  );
};

export default App;