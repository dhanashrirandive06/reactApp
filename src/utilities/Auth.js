import { useState, createContext, useContext } from "react";
import TweetAppService from "./TweetAppService";



const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const[user,setUser] = useState(null);
    const[tweetid,setTweetid] = useState(null);
    const[tweetuser,setTweetuser] = useState(null);
    const service = new TweetAppService();
    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        localStorage.clear();
        setUser(null);
    }
    
    return(
         <AuthContext.Provider value={{service, user, login, logout }}>
        {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext);
}