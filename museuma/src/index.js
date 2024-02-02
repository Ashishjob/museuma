import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/navbar';
import { motion } from 'framer-motion';


const LeftSide = () => {
  return (
    <motion.div
      initial={{ width: '100%' }}
      animate={{ width: '0%' }}
      transition={{ duration: 3 }}
      className="left-side"
    >
    </motion.div>
  );
};

const RightSide = () => {
  return (
    <motion.div
      initial={{ width: '100%' }}
      animate={{ width: '0%' }}
      transition={{ duration: 3 }}
      className="right-side"
    >
    </motion.div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
    <LeftSide />
    <RightSide />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
