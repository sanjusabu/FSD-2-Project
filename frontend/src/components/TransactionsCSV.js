import React, { useState } from "react";
import Papa from "papaparse";

function TransactionsCSV() {
  const [csvData, setCsvData] = useState([]);

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

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleCsvFileUpload} />
      <p>CSV data:</p>
      <pre>{JSON.stringify(csvData, null, 2)}</pre>
    </div>
  );
}

export default TransactionsCSV;
