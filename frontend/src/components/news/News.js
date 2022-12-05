import React from "react";
import data from "./data.json";
import TempNavbar from "../tempNavbar";

const News = () => {
  return (
    <div>
      <TempNavbar />
      <div className="news">
        <h1 className="newsfont">NEWS</h1>
        <div className="">
          <div className="news-container">
            {data &&
              data.map((news) => {
                return (
                  <div class="card flex-box" style={{ width: "18rem" }}>
                    <img src={news.image} class="card-img-top" alt="image" />
                    <div class="card-body">
                      <h5 class="card-title">{news.headline}</h5>
                      <p class="card-text">{news.summary}</p>
                      <a href={news.url} class="btn btn-primary">
                        Read More
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
