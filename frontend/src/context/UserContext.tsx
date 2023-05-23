import {createContext, ReactElement, useContext, useEffect, useState} from "react";
import axios from "axios";
import {User} from "../model/user";
import {OrganizationProvider} from "./OrganizationContext";

export const UserProvider = createContext<{
    login: (username: string, password: string) => Promise<void>,
    currentUser?: User,
    isLoggedIn: boolean,
    isAdmin: boolean,
    get: () => void,
    logout: () => void
}>({
    login: () => Promise.resolve(),
    isLoggedIn: false,
    isAdmin: false,
    get: () => {},
    logout: () => {}
})

export default function UserContext(props: { children: ReactElement }) {
    const context = useContext(OrganizationProvider)
    const [user, setUser] = useState<User>()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(
        () => getUser(),
        []
    )

    function getUser() {
        axios.get('/api/user/me')
            .then(response => {
                setIsLoggedIn(response.data !== undefined)
                setIsAdmin(response.data.role === "ADMIN")
                setUser(response.data)
            })
    }
    function loginUser(username: string, password: string): Promise<void> {
        return axios.post("/api/user", undefined, {auth: {username, password}})
            .then(response => {
                getUser()
                setIsLoggedIn(response.data !== undefined)
                setIsAdmin(response.data.role === "ADMIN")
                setUser(response.data)
                context.getAllOrganizations()

            })
    }
    function logout(): void {
        axios.post("/api/user/logout", undefined)
            .then(() => {
                getUser()
                setIsLoggedIn(false);
                setIsAdmin(false);
                setUser(undefined)
                context.resetState()
            })
    }


    return (
        <UserProvider.Provider value={{
            login: loginUser,
            currentUser: user,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin,
            get: getUser,
            logout: logout
        }}>
            {props.children}
        </UserProvider.Provider>
    )
}