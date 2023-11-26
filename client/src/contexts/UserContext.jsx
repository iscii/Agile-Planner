import React, { useState, createContext, useEffect } from "react";
import Cookies from 'js-cookie';
export const UserContext = createContext();

export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const userData = Cookies.get('auth');
        if(userData) {
            console.log(`logged in by cookie: ${userData}`)
            setCurrentUser(JSON.parse(userData));
        }
    }, []);

    const setUserCookie = (user) => {
        setCurrentUser(user)
        const expirationTime = new Date(new Date().getTime() + 60000);
        Cookies.set('auth', JSON.stringify(user), { expires: expirationTime });
    }

    const isLoggedIn = () => {
        console.log(currentUser)
        return Object.keys(currentUser).length > 0;
    }

    return (
        <UserContext.Provider value={{currentUser, setUserCookie, isLoggedIn}}>
            {props.children}
        </UserContext.Provider>
    );
};