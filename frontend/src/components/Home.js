import NavBar from "./NavBar";
import Cards from "./Cards";
import CardGroup from "react-bootstrap/CardGroup";
import SimpleImageSlider from "react-simple-image-slider";
import useResizeObserver from "use-resize-observer";
import { FooterContainer } from "../containers/footer";
import "./Home.css";
const Home = () => {
  const { ref, width = 1, height = 1 } = useResizeObserver();
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
      <div className="content">
        <NavBar />
        <br />
        <br />
        <div style={homecss}>
          <div style={homecss1}>
            <h2>Stock Portfolio Dashboard</h2><br/><br/>
            <h1><b>Stock Portfolio Management Now At Your Fingertips</b></h1>
          </div>
          <div style={homecss2}>
            <img src="./stocks1.jpg" />
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
        <h1><b>Features and Advantages</b></h1>
        <br />
        <br />
        <CardGroup>
          <Cards
            text="Manage the transactions of different Demat Accounts at one place."
            title="ALL IN ONE"
            img="cardimg1.jpg"
          />

          <Cards
            text="We Alert you about your profit/loss in real time."
            title="IN CASE YOU WERE BUSY"
            img="cardimg2.jpg"
          />

          <Cards
            text="Gives meaningful statistical insights for each of your portfolios individually and combined."
            title="STATISTICAL INSIGHT"
            img="cardimg3.jpg"
          />
        </CardGroup>
        <br />
        <br />
        <div style={homecss}>
          <div style={homecss1}>
            <img src="./homestocks.jpg" />
          </div>
          <div style={homecss2}>
            <h1><b>Best Investment Application</b></h1><br/><br/>
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
