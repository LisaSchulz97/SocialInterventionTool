import React from 'react';
import './App.css';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import OrganizationTable from './card/OrganizationTable';
import AddView from "./add/AddView";
import 'react-toastify/dist/ReactToastify.css';
import OrganizationDetail from './detail/OrganizationDetail';
import FormContext from './context/FormContext';
import ChangeView from './change/ChangeView';
import LoginPage from "./login/LoginPage";
import QuestionGallery from "./gallery/QuestionGallery";
import ResultView from "./result/ResultView";
import Header from "./static/Header";
import TextMessage from "./gallery/TextMessage";
import Address from "./gallery/Address";

function App() {

    return (
        <div className="App">
            <BrowserRouter basename={""}>
                <Routes>
                    <Route path={"/question"}>
                        <Route index element={
                            <QuestionGallery/>
                        }/>
                        <Route path={"text"} element={
                            <TextMessage/>
                        }/>
                        <Route path={"address"} element={
                            <Address/>
                        }/>
                    </Route>
                    <Route path={"/app/result"} element={
                        <>
                        <Header/>
                        <ResultView/>
                        </>
                    }/>
                    <Route path={"/login"} element={
                        <>
                            <Header/>
                        <LoginPage />
                            </>
                    }/>
                    <Route path={"/"} element={
                        <>
                            <Header/>
                        <OrganizationTable/>
                            </>
                    }/>
                    <Route path={"/app/organization/details/:id"} element={
                        <>
                            <Header/>
                        <OrganizationDetail/>
                            </>
                    }/>;
                    <Route path={"/app/add"} element={
                        <>
                            <Header/>
                        <FormContext>
                            <AddView/>
                        </FormContext>
                            </>
                    }/>
                    <Route path={"/app/organization/edit/:id"} element={
                        <>
                            <Header/>
                        <FormContext>
                            <ChangeView/>
                        </FormContext>
                            </>
                    }/>
                </Routes>
            </BrowserRouter>
            <ToastContainer theme={"dark"}/>
        </div>);
}

export default App;

