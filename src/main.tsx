import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ServicesContext } from "./context/ServicesContext.ts";
import "./index.css";
import JobApplicationService from "./services/JobApplicationService.ts";

const jobApplicationService = new JobApplicationService();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ServicesContext.Provider value={{ jobApplicationService }}>
      <App />
    </ServicesContext.Provider>
  </React.StrictMode>
);
