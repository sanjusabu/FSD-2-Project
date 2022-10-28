import Card from "react-bootstrap/Card";
import './Cards.css';

const Cards = (props) => {
  return (
    <>
      <div className="card">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={props.img} />
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.text}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Cards;