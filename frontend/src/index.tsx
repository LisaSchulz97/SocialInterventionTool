import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import OrganizationContext from "./context/OrganizationContext";
import UserContext from "./context/UserContext";
import QuestionnaireContext from "./context/QuestionnaireContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <OrganizationContext>
          <UserContext>
          <QuestionnaireContext>
    <App />
          </QuestionnaireContext>
      </UserContext>
      </OrganizationContext>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
