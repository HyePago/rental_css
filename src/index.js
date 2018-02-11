// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App';

// const rootElement = document.getElementById('root');
// //ReactDOM.render(App.App, rootElement);
// ReactDOM.render(<App />, rootElement);

import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route, browserHistory, IndexRoute } from 'react-router';
//import { Switch, BrowserRouter, Route } from 'react-router-dom'

import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

import App from './components/App';
import SignUpForm from './components/SignUpForm.jsx'
import SignInForm from './components/SignInForm.jsx'
import Non_Member_ServiceCenter from './components/Non_Member_ServiceCenter.jsx'
import Non_Member_feedback from './components/Non_Member_feedback.jsx'

// ReactDOM.render(<Router history = {browserHistory}>
//     <Route path = "/" component = {App}>
//        <IndexRoute component = {SignUpForm} />
//        <Route path = "home" component = {SignInForm} />
//        <Route path = "about" component = {Non_Member_ServiceCenter} />
//        <Route path = "articles" component = {Non_Member_feedback} />
//     </Route>
//  </Router>, document.getElementById('root'));

ReactDOM.render((
    <Router history={history}>
        <App />
    </Router>
), document.getElementById('root'));