import NavBar from "./NavBar";
import Cards from "./Cards";
import CardGroup from "react-bootstrap/CardGroup";
import SimpleImageSlider from "react-simple-image-slider";
import useResizeObserver from "use-resize-observer";
import { FooterContainer } from "../containers/footer";
import "./Home.css";
const Home = () => {
  // const { ref, width = 1, height = 1 } = useResizeObserver();
  const images = [
    { url: "stocks.jpg" },
    { url: "stocks.jpg" },
    { url: "stocks.jpg" },
    { url: "stocks.jpg" },
  ];
  const homecss = {
    display: "flex",
    flexDirection: "row",
  };
  const homecss1 = {
    width: "50%",
    float: "left",
    
  };
  const homecss2 = {
    width: "50%",
    float: "right", 
  };
  return (
    <div>
      <div className="home"></div>
      <NavBar />
      <div className="content">
        <br />
        <br />
        <div style={homecss}>
          <div style={homecss1}>
            <span className="homeh2">
              <h2>Stock Portfolio Dashboard</h2>
            </span>
            <br />
            <br />
            <h1>
              <b>Stock Portfolio Management Now At Your Fingertips</b>
            </h1>
          </div>
          <div style={homecss2}>
            <img src="https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0b2Nrc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="img" />
          </div>
        </div>
        <br />
        <br />
        {/* <div
        ref={ref}
        className="card_imgBox"
        style={{ width: "100%", height: "70vh" }}
      >
        <SimpleImageSlider
          width={896}
          height={500}
          images={images}
          showBullets={true}
          showNavs={true}
        />
      </div> */}
        <h1>
          <b>Features and Advantages</b>
        </h1>
        <br />
        <br />
        <CardGroup>
          <Cards
            text="Manage the transactions of different Demat Accounts at one place."
            title="ALL IN ONE"
            img="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3RvY2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          />

          <Cards
            text="We Alert you about your profit/loss in real time."
            title="IN CASE YOU WERE BUSY"
            img="https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
          />

          <Cards
            text="Gives meaningful statistical insights for each of your portfolios individually and combined."
            title="STATISTICAL INSIGHT"
            img="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW5hbHlzaXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
          />
        </CardGroup>
        <br />
        <br />
        <div style={homecss}>
          <div style={homecss1}>
            <img src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGludmVzdG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60" alt = "img" />
          </div>
          <div style={homecss2}>
            <h1>
              <b>Best Investment Application</b>
            </h1>
            <br />
            <br />
            <p>
              Stock Portfolio Dashboard (SPD) is intended to help the user keep
              account of his/her money invested in Share Market. This part is
              meant to explain the features of SPD, so as to serve as a guide to
              the developers on one hand and a website validation document for
              the prospective client on the other. SPD is aimed towards a person
              who has a considerable number of investments in the stock market,
              and so needs website assistance for book keeping and computations
              regarding the investments. SPD is a user-friendly, ‘quick to
              learn’ and a reliable website for the above purpose.
            </p>
          </div>
        </div>
        <br />
        <br />
        <FooterContainer />
      </div>
    </div>
  );
};

export default Home;
