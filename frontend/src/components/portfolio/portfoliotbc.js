import { useState } from "react";
const Check = (props) => {
  console.log(props.details, props.count);
  const [show, setShow] = useState(false);
  const TableHandler = (e) => {
    e.preventDefault();
    setShow(true);
  };
  return (
    <div style={{ backgroundColor: "black" }}>
      <h2>{props.details.portfolio}</h2>
      <h2>{props.details.platform}</h2>
      <button onClick={TableHandler} className="button-20" id={props.count}>
        Show Table
      </button>
    </div>
  );
};

export default Check;
