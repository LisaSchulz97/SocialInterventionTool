import {createContext, ReactElement, useContext, useEffect, useState} from "react";
import axios from "axios";
import {User} from "../model/user";
import {OrganizationProvider} from "./OrganizationContext";
import {toast} from "react-toastify";

export const UserProvider = createContext<{
    login: (username: string, password: string) => Promise<void>,
    currentUser?: User,
    isLoggedIn: boolean,
    isAdmin: boolean,
    getUser: () => void,
    logout: () => void,
    signup: (username: string, password: string) => Promise<any>,
    userId: User
}>({
    login: () => Promise.resolve(),
    isLoggedIn: false,
    isAdmin: false,
    getUser: () => {},
    logout: () => {},
    signup: () => Promise.resolve(),
    userId: {username: "", password: "", id:"", role: "BASIC"}
})

export default function UserContext(props: { children: ReactElement }) {
    const context = useContext(OrganizationProvider)
    const [user, setUser] = useState<User>()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [userId, setUserId] = useState<User>({username: "", password: "", id:"", role: "BASIC"})

    useEffect(
        () => getUser(),
        // eslint-disable-next-line
        []
    )

    function getUser() {
        axios.get('/api/user/me')
            .then(response => {
                const isLoggedIn = response.data !== ""
                if (isLoggedIn) {
                    setIsLoggedIn(true)
                    setIsAdmin(response.data.role === "ADMIN")
                    setUser(response.data)
                    context.getAllOrganizations()
                }
            })
            .catch(error => console.dir(error))
    }

    function loginUser(username: string, password: string): Promise<void> {
        return axios.post("/api/user", undefined, {auth: {username, password}})
            .then(response => {
                setIsLoggedIn(response.data !== undefined)
                setIsAdmin(response.data.role === "ADMIN")
                setUser(response.data)
                context.getAllOrganizations()
            })
    }
    function logout(): void {
        axios.post("/api/user/logout", undefined)
            .then(() => {
                setIsLoggedIn(false);
                setIsAdmin(false);
                setUser(undefined)
                context.resetState()
            })
    }

    function signUp(username: string, password: string) {
        return axios.post("/api/user/signup", {username, password})
            .then(response => {
                setUserId(response.data)
            })
            .catch(() => toast.error("SignUp failed!"))
    }

    return (
        <UserProvider.Provider value={{
            login: loginUser,
            currentUser: user,
            isLoggedIn,
            isAdmin,
            getUser,
            logout,
            signup: signUp,
            userId
        }}>
            {props.children}
        </UserProvider.Provider>
    )
}