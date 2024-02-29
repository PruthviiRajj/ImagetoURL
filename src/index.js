import React from 'react';
import ReactDOM from 'react-dom';
import ImageUploadDashboard from './Imageupload';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
<BrowserRouter>
<App/>
</BrowserRouter>
,
document.querySelector("#root"));
