import { useState } from "react";
import ProfileBreakdown from "./ProfileBreakdown";
import ProfileGrowth from "./ProfileGrowth";
import "./ProfileCharts.css";

const ProfileCharts = () => {
    const [page, setPage] = useState(0);

    const PageDisplay = () => {
        if (page === 0) {
            return(
                <ProfileBreakdown/>
            )
        } else if (page === 1){
            return(
                <ProfileGrowth/>
            )
        }
    }

    return(
        <div>
            <div>
            {PageDisplay()}
            </div>
            <div className="chartbuttons" style={{marginTop: "5 %", marginLeft: "6%"}}>
            <button className="arrow left"
              disabled={page === 0}
              onClick={(e) => {
                e.preventDefault();
                setPage((currPage) => currPage - 1);
              }}
            >
            </button>
            <span style={{marginLeft: "20%"}}>{page+1}/2</span>
            <button className="arrow right"
              disabled={page === 1}
              onClick={(e) => {
                e.preventDefault();
                setPage((currPage) => currPage + 1);
              }}
            >
            </button>
            </div>
        </div>
    )
}

export default ProfileCharts;