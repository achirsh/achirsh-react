import React from "react";
import { routes } from "config/route";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { BASENAME } from "config";
import Page404 from "./404";

export default class extends React.Component {
    public render() {
        return <Router basename={BASENAME}>
            <Switch>
                {routes.map((route) => (
                    <Route exact={true} path={route.path} component={route.component} key={route.path} />
                ))}
                <Route path="*" component={Page404} />
            </Switch>
        </Router>
    }
}