// CustomToastContainer.jsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import './customToast.css';
import 'react-toastify/dist/ReactToastify.css'; // Import default styles

export default function CustomToast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className="custom-toast-container"
      toastClassName="custom-toast"
    />
  );
}
