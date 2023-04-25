import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Header from "./static/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import OrganizationTable from './card/OrganizationTable';
import AddView from "./add/AddView";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
      <div className="App">
            <BrowserRouter>
          <Header/>
                <Routes>
                <Route path={"/menu"} element={
                    <OrganizationTable/>
                }/>
                    <Route path={"/add"} element={
                        <AddView/>
                    }/>
                </Routes>
            </BrowserRouter>

        <ToastContainer theme={"dark"}/>

      </div>
  );
}
export default App;
