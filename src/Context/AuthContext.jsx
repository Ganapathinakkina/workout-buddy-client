import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state
    }
}

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    const [isAuthLoaded, setIsAuthLoaded] = useState(false); // Loading state


useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
        dispatch({type: "LOGIN", payload: user})
    }

    setIsAuthLoaded(true); // Mark auth as loaded
},[])

    return(
        <AuthContext.Provider value={{...state, dispatch, isAuthLoaded }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider