import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import SignUpForm from './SignUpForm.jsx'
import SignInForm from './SignInForm.jsx'
import Non_Member_ServiceCenter from './Non_Member_ServiceCenter.jsx'
import Non_Member_feedback from './Non_Member_feedback.jsx'

//const rootElement = document.getElementById('root');
//ReactDOM.render(<App />, rootElement);

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={SignInForm} />
            <Route path="up" component={SignUpForm} />
            <Route path="ns" component={Non_Member_ServiceCenter} />
            <Route path="nf" component={Non_Member_feedback} />
        </Route>
    </Router>,
    document.getElementById('root')
);