import React, { useState } from "react";
import Papa from "papaparse";
import { useRequest } from "../hooks/request-hook";
function TransactionsCSV() {
  const [csvData, setCsvData] = useState([]);
  const { sendRequest } = useRequest();
  const handleCsvFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="file" accept=".csv" onChange={handleCsvFileUpload} />
        <p>CSV data:</p>
        {console.log(csvData)}
        {/* <pre>{JSON.stringify(csvData, null, 2)}</pre> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TransactionsCSV;
