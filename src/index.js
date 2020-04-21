import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { logger } from '../Middleware/Logging'

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

app.post('/log-client-errors', (req, res) => {
    let error       = req.body.error.message;
    let errorInfo   = req.body.error.stack;
    logger.error(`The app received a new client log: ${error} ${errorInfo}`);
    res.status(200);
}); 