import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import { filterCards, orderCards } from '../../redux/actions';
import styles from './favorites.module.css';

const Favorites = (props) => {
  const { myFavorites } = props;
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
    setAux(!aux);
  };
  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value));
  };

  return (
    <div>
      <div>
        <select className={styles.select} onChange={handleOrder}>
          <option>Order</option>
          <option value='A'>Ascendente</option>
          <option value='D'>Descendente</option>
        </select>
        <select className={styles.select} onChange={handleFilter}>
          <option value='#'>Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Genderless'>Genderless</option>
          <option value='unknown'>Unknown</option>
        </select>
      </div>
      <div className={styles.grid}>
        {' '}
        {/* Aplica el estilo grid del componente Card */}
        {myFavorites?.map((char) => {
          return (
            <Card
              key={char.id}
              id={char.id}
              name={char.name}
              status={char.status}
              species={char.species}
              gender={char.gender}
              origin={char.origin}
              image={char.image}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

export default connect(mapStateToProps, null)(Favorites);
