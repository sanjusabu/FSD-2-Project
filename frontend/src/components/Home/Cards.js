import React from 'react';
import styles from './Cards.module.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className={styles.cards} id="services">
      <h1>Features and Advantages</h1>
      <div className={styles['cards__container']}>
        <div className={styles['cards__wrapper']}>
          <ul className={styles['cards__items']}>
            <CardItem
              src='https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3RvY2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
              text='Manage the transactions of different Demat Accounts at one place.'
              // path='/about'
            />
            <CardItem
              src='https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60'
              text='We Alert you about your profit/loss in real time.'
              // path='/login'
            />
            <CardItem
              src='https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW5hbHlzaXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60'
              text='Gives meaningful statistical insights for each of your portfolios individually and combined.'
              // path='/login'
            />
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Cards;
