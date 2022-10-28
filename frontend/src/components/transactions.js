import CreateTransactions from "./createTransactions";
import { useContext, useState, useEffect } from "react";
import { Detailscontext } from "../context/details";
import TempNavbar from "./tempNavbar.js";
const Transactions = () => {
  const dets = useContext(Detailscontext);

  // const [data, setdata] = useState([]);
  // const [send, setSend] = useState([dets.details]);
  // const [show, setShow] = useState(false);

  const getdetails = (dat) => {
    // console.log(data, "hreghj");
    dets.details.push(dat);
    // if (dat) {
    //   setdata((prevstate) => {
    //     const newState = [...prevstate];
    //     newState.unshift(dat);
    //     console.log(newState);
    //     return newState;
    //   });
    // }
  };

  console.log(dets.details);

  return (
    <>
      <TempNavbar />
      <CreateTransactions takedetails={getdetails} />
      <br></br>
      <table className="container">
        <tr>
          <th>Ticker</th>
          <th>Date</th>
          <th>Action</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
        {dets.details.map((item) => {
          return (
            <tr>
              <td>{item.Ticker}</td>
              <td>{item.Date}</td>
              <td>{item.action}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.total}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default Transactions;
