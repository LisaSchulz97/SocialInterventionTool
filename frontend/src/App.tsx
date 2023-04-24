import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Header from "./static/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import OrganizationTable from './card/OrganizationTable';


function App() {
  return (
      <div className="App">
            <BrowserRouter>
          <Header/>
                <Routes>
                <Route path={"/menu"} element={
                    <OrganizationTable/>
                }/>
                </Routes>
            </BrowserRouter>

        <ToastContainer theme={"dark"}/>

      </div>
  );
}
export default App;
