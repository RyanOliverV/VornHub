import React from "react";
import { createRoot } from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";
import App from './components/App';
import "@fontsource/roboto";
import '../static/css/index.css'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <App />
);
