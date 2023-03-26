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
        <img src="https://cdn-icons-png.flaticon.com/512/8242/8242984.png" alt="csv" />
        <button onClick={importTrans}>Import Transactions</button>
      </div>
      <div className="or-text">
        OR
      </div>
      <div className="right-side">
        <img src="https://www.citypng.com/public/uploads/small/11639609690xbu4iad55iatfiamr0mubuufcpkb0evmjl5vyw51wmfg5kgp2zuxu8povuxuv94447qbduv3fuilf4t64gpieflfiprdyqyesixc.png" alt="add" />
        <button onClick={manualTrans}>Add Manually</button>
      </div>
    </div>
  );
}

export default TransactionOption;
