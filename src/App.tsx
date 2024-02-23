import React from "react";
import DeliveryForm from "./pages/DeliveryCharges";
import "./App.css";

function App() {
  return (
    <div className="main-container">
      <div className="container">
        <h1 className="main-heading">Delivery Fee Calculator</h1>
        <DeliveryForm />
      </div>
    </div>
  );
}

export default App;
