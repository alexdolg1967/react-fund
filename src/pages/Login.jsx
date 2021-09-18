import React, { useContext } from 'react'
import MyButton from '../components/UI/Button/MyButton'
import MyInput from '../components/UI/Input/MyInput'
import { AuthContext } from '../context/context'

export const Login = () => {

	const {isAuth, setIsAuth} = useContext(AuthContext)

	const login = event => {
		event.preventDefault();
		setIsAuth(true)
	}

	return (
        <div className="main">
            <h2>Страница для логина</h2>
            <form on onSubmit={login}>
                <MyInput
                    type="text"
                    name=""
                    id=""
                    placeholder="Введите логин"
                />
                <MyInput
                    type="password"
                    name=""
                    id=""
                    placeholder="Введите пароль"
                />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
}
