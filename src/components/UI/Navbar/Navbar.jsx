import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context/context';
import MyButton from '../Button/MyButton';

export const Navbar = () => {

	const {isAuth, setIsAuth} = useContext(AuthContext)

	const logout = () => {
        setIsAuth(false);
        localStorage.removeItem("auth");
    };

    return (
        <div className="navbar">
			<MyButton onClick={logout}>
				Выйти
			</MyButton>
            <div className="navbar__links">
                <Link to="/about">О сайте</Link>
                <Link to="/posts">Блог</Link>
            </div>
        </div>
    )
}
