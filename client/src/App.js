import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import Vote from 'routes/vote';
import Output from 'routes/output';
import './App.css';

const browserHistory = createBrowserHistory();

function App() {
    return (
        <div className="App">
            <Router history={browserHistory}>
                <Switch>
                    <Route exact path={`/`} component={Vote} />
                    <Route path={`/output`} component={Output} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
