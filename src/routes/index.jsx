import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/views/Home';
import ProductDetail from '../components/views/ProductDetail';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/category/:category" component={Home} />
            <Route
                path="/department/:department/category/:category"
                component={Home}
            />
            <Route path="/product/:productId" component={ProductDetail} />
        </Switch>
    );
};

export default Routes;
