import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../components/views/HomePage';
import ProductDetailPage from '../components/views/ProductDetailPage';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/category/:category" component={HomePage} />
            <Route
                path="/department/:department/category/:category"
                component={HomePage}
            />
            <Route path="/product/:productId" component={ProductDetailPage} />
        </Switch>
    );
};

export default Routes;
