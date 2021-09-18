import React, {useContext} from 'react'
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router/routs";
import { AuthContext } from '../context/context';
import Loader from './UI/Loader/Loader';

export const AppRouter = () => {
	const {isAuth,isLoading} = useContext(AuthContext)

	if (isLoading) {
		return <Loader/>
	}
	
    return isAuth ? (
        <Switch>
            {privateRoutes.map((route) => (
                <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
					key={route.path}
                />
            ))}
            <Redirect to="/posts" />
        </Switch>
    ) : (
        <Switch>
            {publicRoutes.map((route) => (
                <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
					key={route.path}
                />
            ))}
            <Redirect to="/login" />
        </Switch>
    );
}
