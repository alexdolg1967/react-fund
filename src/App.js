import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/UI/Navbar/Navbar";
import "./styles/App.css";
import { AppRouter } from "./components/AppRouter";

export default function App() {
    return (
        <div className="app">
            <Router>
                <Navbar />
                <AppRouter />
            </Router>
        </div>
    );
}
