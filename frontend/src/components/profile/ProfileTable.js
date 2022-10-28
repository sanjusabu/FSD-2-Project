import { useState, useContext } from "react";
import { Detailscontext } from "../../context/details";
const ProfileTable = () => {
  const dets = useContext(Detailscontext);
  console.log(dets.details);
  return (
    <div className="row">
      <div className="col-md-12 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table id="example" className="table table-striped data-table">
                <thead>
                  <tr>
                    <th>Date of Transaction </th>
                    <th>Ticker</th>
                    <th>Action</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>

                  {dets.details.map((i) => (
                    <tr>
                      <td>{i.Date}</td>
                      <td>{i.Ticker}</td>
                      <td>{i.action}</td>
                      <td>{i.quantity}</td>
                      <td>{i.price}</td>
                      <td>{i.total}</td>
                    </tr>
                  ))}
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTable;
