import React, {ChangeEvent} from 'react';
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
import Adress from "./gallery/Adress";
import {dummyQuestionnaire} from "./model/questionnaire";

function App() {

    return (
        <div className="App">
            <BrowserRouter basename={"/question"}>
                <Routes>
                    <Route path={"/"} element={
                        <QuestionGallery/>
                    }/>
                    <Route path={"/text"} element={
                        <TextMessage/>
                    }/>
                    <Route path={"/adress"} element={
                        <Adress/>
                    }/>
                </Routes>
            </BrowserRouter>
            <BrowserRouter basename={"/app"}>
                <Header/>
                <Routes>
                    <Route path={"/result"} element={
                        <ResultView/>
                    }/>
                    <Route path={"/login"} element={
                        <LoginPage />
                    }/>
                    <Route path={"/menu"} element={
                        <OrganizationTable/>
                    }/>
                    <Route path={"/organization/details/:id"} element={
                        <OrganizationDetail/>
                    }/>;
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
                </Routes>
            </BrowserRouter>
            <ToastContainer theme={"dark"}/>
        </div>);
}

export default App;

