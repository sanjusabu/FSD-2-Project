import NavBar from "./NavBar";
import Cards from "./Cards";
import CardGroup from "react-bootstrap/CardGroup";
import SimpleImageSlider from "react-simple-image-slider";
import useResizeObserver from "use-resize-observer";
const Home = () => {
  const { ref, width = 1, height = 1 } = useResizeObserver();
  const images = [
    { url: "stocks.jpg" },
    { url: "stocks.jpg" },
    { url: "stocks.jpg" },
    { url: "stocks.jpg" },
  ];
  return (
    <>
      <NavBar />
      <div
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
      </div>
      <CardGroup>
      <Cards
        text="Some quick example text to build on the card title and make up the
          bulk of the card's content."
        title="Card Title"
        img="stocks.jpg"
      />

      <Cards
        text="Some quick example text to build on the card title and make up the
          bulk of the card's content."
        title="Card Title"
        img="stocks.jpg"
      />

      <Cards
        text="Some quick example text to build on the card title and make up the
          bulk of the card's content."
        title="Card Title"
        img="stocks.jpg"
      />
      </CardGroup>
    </>
  );
};

export default Home;
