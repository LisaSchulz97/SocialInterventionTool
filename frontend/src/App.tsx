import React from 'react';
import './App.css';
import {ToastContainer} from 'react-toastify';
import Header from "./static/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import OrganizationTable from './card/OrganizationTable';
import AddView from "./add/AddView";
import 'react-toastify/dist/ReactToastify.css';
import OrganizationDetail from './detail/OrganizationDetail';
import FormContext from './context/FormContext';
import ChangeView from './change/ChangeView';
import LoginPage from "./login/LoginPage";



function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path={"/login"} element={
                        <LoginPage />
                    }/>
                    <Route path={"/menu"} element={
                        <OrganizationTable/>
                    }/>
                    <Route path={"/add"} element={
                        <FormContext>
                            <AddView/>
                        </FormContext>
                    }/>
                    <Route path={"/organization/edit/:id"} element={
                        <FormContext>
                            <ChangeView/>
                        </FormContext>
                    }/>
                    <Route path={"/organization/details/:id"} element={
                        <OrganizationDetail/>
                    }/>
                </Routes>
            </BrowserRouter>

            <ToastContainer theme={"dark"}/>

        </div>
    );
}

export default App;
