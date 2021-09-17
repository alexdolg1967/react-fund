import React from 'react'
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { routes } from '../router/routs';

export const AppRouter = () => {
    return (
        <Switch>
            {routes.map(route => 
				<Route 
					component={route.component} 
					path={route.path} 
					exact={route.exact} 
				/>
			)}
            <Redirect to="/posts" />
        </Switch>
    )
}
