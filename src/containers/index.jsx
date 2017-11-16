import React from 'react';
import { Switch, Router } from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';

class Home extends Component {
    render() {
        return (
            <Switch>
                <Router exact path='/' component={Landing} />
                <Router path='/#/login/' component={Login} />
            </Switch>
        );
    }
};

export default Home;
