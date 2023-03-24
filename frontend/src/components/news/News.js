import React from "react";
import data from "./data.json";
import TempNavbar from "../tempNavbar";

const News = () => {
  return (
    <div>
      <TempNavbar />
      <div className="news">
        <h1 className="newsfont">HeadLines</h1>
        <div className="">
          <div className="newsCard">
            {data &&
              data
                .filter((dat) => dat.source != "Bloomberg")
                .map((news) => {
                  return (
                    <li className="item">
                      <img src={news.image} className="newsImage" alt="news" />
                      <div className="newsContent">
                        <p className="description">
                          <strong>{news.headline}</strong>
                        </p>
                        <p className="description">{news.summary}</p>
                        <p>News Category: "{news.category}"</p>
                        <br />
                        <a
                          href={news.url}
                          className="btn btn-dark"
                          style={{ marginLeft: "30%" }}
                        >
                          Read More
                        </a>
                      </div>
                    </li>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
