import React, { useState, useEffect } from "react";
import { useRequest } from "../../hooks/request-hook";

const ProfileStatTGain = () => {
  const { sendRequest } = useRequest();
  const [transData, setTransData] = useState([]);
  useEffect(() => {
    const Details = async () => {
      const res = await sendRequest(
        "https://fsdproject2.onrender.com/trans/getTrans",
        "POST",
        JSON.stringify({
          id: localStorage.getItem("user"),
        }),
        { "Content-Type": "application/json" }
      );
      // console.log(res, "getformdata");
      setTransData(res);
      // setportData((prevstate)=>{
      //   let newstate = [...prevstate,]
      // })
      // res.map((data) => setportData(data));
    };
    Details();
  }, []);
  // console.log(transData);
  let tblData = transData.map((data) => {
    return [
      data.portfolio,
      data.ticker,
      data.action,
      data.quantity,
      data.price,
      data.total,
    ];
  });

  let array = [];

  for (let i = 0; i < tblData.length; i++) {
    if (tblData[i][2] === "buy") {
      array.push([tblData[i][1], parseInt(tblData[i][3])]);
    } else if (tblData[i][2] === "sell") {
      array.push([tblData[i][1], -1 * parseInt(tblData[i][3])]);
    }
  }

  let result = [];
  array.reduce(function (res, value) {
    if (!res[value[0]]) {
      res[value[0]] = { 0: value[0], 1: 0 };
      result.push(res[value[0]]);
    }
    res[value[0]][1] += value[1];
    return res;
  }, {});

  // console.log(result, "result");

  let array1 = [];
  for (let i = 0; i < tblData.length; i++) {
    if (tblData[i][2] === "buy") {
      array1.push([tblData[i][1], parseInt(tblData[i][5])]);
    } else if (tblData[i][2] === "sell") {
      array1.push([tblData[i][1], -1 * parseInt(tblData[i][5])]);
    }
  }

  let result1 = [];
  array1.reduce(function (res, value) {
    if (!res[value[0]]) {
      res[value[0]] = { 0: value[0], 1: 0 };
      result1.push(res[value[0]]);
    }
    res[value[0]][1] += value[1];
    return res;
  }, {});

  // console.log(result1, "result1");

  let result11 = [];
  for (let i = 0; i < result.length; i++) {
    if (result[i][1] >= 0) {
      result11.push([result1[i][0], result1[i][1]]);
    }
  }
  // console.log(result11, "result11");
  let tgain = 0;

  for (let i = 0; i < tblData.length; i++) {
    if (tblData[i][2] === "sell") {
      tgain += parseInt(tblData[i][5]);
    }
  }

  return (
    <div>
      <span style={{ fontWeight: "bold", fontSize: "30px" }}>₹{tgain}</span>
    </div>
  );
};

export default ProfileStatTGain;
