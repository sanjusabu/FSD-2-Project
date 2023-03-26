import React from 'react';
import styles from "./Cards.module.css";
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
      <li className={styles['cards__item']}>
        <Link className={styles['cards__item__link']} to={props.path}>
          <figure className={styles['cards__item__pic-wrap']} data-category={props.label}>
            <img
              className={styles['cards__item__img']}
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className={styles['cards__item__info']}>
            <h5 className={styles['cards__item__text']}>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
