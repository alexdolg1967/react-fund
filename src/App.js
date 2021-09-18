import React, {useEffect, useState} from "react";
import "./styles/App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/UI/Navbar/Navbar";
import { AppRouter } from "./components/AppRouter";
import { AuthContext } from "./context/context";

export default function App() {
	const [isAuth, setIsAuth] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setIsAuth(true)
		}
		setIsLoading(false)
	},[])
    return (
        <div className="app">
			<AuthContext.Provider value={{
				isAuth,
				setIsAuth,
				isLoading
			}}>
				<Router>
					<Navbar />
					<AppRouter />
				</Router>
			</AuthContext.Provider>
            
        </div>
    );
}
