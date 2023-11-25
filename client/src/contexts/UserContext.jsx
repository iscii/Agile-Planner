import React, { useState, createContext } from "react";
export const UserContext = createContext();

export const UserProvider = (props) => {
    // populate if express server holds a session cookie
    // populate if logged in and add to session cookie
};