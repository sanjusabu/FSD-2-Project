import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TransactionOption.css";

const TransactionOption = () => {
  const nagivate = useNavigate();
  const importTrans = () => {
    nagivate("/importtransactions")
  }
  const manualTrans = () => {
    nagivate("/manualtransactions")
  }
  return (
    <div className="split-page">
      <div className="left-side">
        <img src="left-icon.png" alt="left icon" />
        <button onClick={importTrans}>Import Transactions</button>
      </div>
      <div className="or-text">
        OR
      </div>
      <div className="right-side">
        <img src="right-icon.png" alt="right icon" />
        <button onClick={manualTrans}>Add Manually</button>
      </div>
    </div>
  );
}

export default TransactionOption;
