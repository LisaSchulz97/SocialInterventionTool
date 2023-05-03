import {createContext, ReactElement, useEffect, useState} from "react";
import axios from "axios";
import {User} from "../model/user";

export const UserProvider = createContext<{
    login: (username: string, password: string) => Promise<void>,
    currentUser?: User,
    isLoggedIn: boolean,
    isAdmin: boolean
}>({
    login: () => Promise.resolve(),
    isLoggedIn: false,
    isAdmin: false
})

export default function UserContext(props: {children: ReactElement}) {

    const [user, setUser] = useState<User>()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        setIsLoggedIn(user !== undefined)
        isLoggedIn
            ? setIsAdmin(user?.role === "ADMIN")
            : setIsAdmin(false)
    }, [user])

    function loginUser(username: string, password: string): Promise<void> {
        return axios.post("/api/user", undefined, {auth: {username, password}})
            .then(response => {setUser(response.data);alert(response)})
    }


    return (
        <UserProvider.Provider value={{
            login: loginUser,
            currentUser: user,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin
        }}>
            {props.children}
        </UserProvider.Provider>
    )
}