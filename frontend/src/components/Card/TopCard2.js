import classes from "./Card.module.css";

const Card = (props) => {
  return <div className={classes.topCard2}>{props.children}</div>;
};

export default Card;