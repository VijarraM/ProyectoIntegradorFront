// import { connect } from "react-redux";
// import { addFav, removeFav } from "../../redux/actions";
import styles from './Card.module.css';
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

// function Card(props) {
//   const { id, name, status, species, gender, origin, image, onClose, addFav, removeFav } = props;

//   const [isFav, setIsFav] = useState(false);

//   useEffect(() => {
//     myFavorites.forEach((fav) => {
//       if (fav.id === props.id) {
//         setIsFav(true);
//       }
//     });
//   }, [myFavorites]);

//   const handleFavorite = () => {
//     isFav ? removeFav(id) : addFav(props);
//     setIsFav(!isFav);
//   };

//   return (
//     <div key={id} className={styles.container}>
//       {isFav ? <button onClick={handleFavorite}>❤️</button> : <button onClick={handleFavorite}>🤍</button>}
//       <button onClick={onClose} className={styles.button}>
//         <span>X</span>
//       </button>

//       <Link to={`/detail/${id}`}>
//         <h2 className={styles.name}>{name}</h2>
//       </Link>
//       <div className={styles.info}>
//         <h2>{status}</h2>
//         <h2>{species}</h2>
//         <h2>{gender}</h2>
//         <h2>{origin}</h2>
//       </div>

//       <img src={image} alt="Not found" />
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     myFavorites: state.myFavorites,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addFav: (character) => {
//       dispatch(addFav(character));
//     },

//     removeFav: (id) => {
//       dispatch(removeFav(id));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Card);

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { removeFav, addFav } from '../../redux/actions';

function Card(props) {
  const location = useLocation();

  const { onClose, id, origin, name, status, species, gender, image } = props;

  const characters = useSelector((state) => state.characters);

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.myFavorites);
  const isFav = Array.isArray(favorites) && favorites.some((fav) => fav.id === id);

  const handleFavorite = () => {
    if (isFav) {
      dispatch(removeFav(id));
    } else {
      dispatch(addFav(props));
    }
  };

  // useEffect(() => {
  //   characters.forEach((fav) => {
  //     if (fav.id === id.toString()) {
  //       setIsfav(true);
  //     }
  //   });
  // }, [characters]);
  return (
    <div className={styles.container}>
      <div className={styles.botones}>
        <button onClick={handleFavorite} className={styles.fav}>
          {isFav ? '❤️' : '🤍'}
        </button>
        {location.pathname !== '/favorites' && (
          <button onClick={() => onClose(id)} className={styles.button}>
            ✖️
          </button>
        )}
      </div>

      <Link to={`/detail/${id}`}>
        <h2 className={styles.name}>{name}</h2>
      </Link>

      <div className={styles.info}>
        <h2>status: {status}</h2>
        <h2>species: {species}</h2>
        <h2>gender: {gender}</h2>
        <h3>origin: {origin}</h3>
        {/* <p>id: {id}</p> */}
      </div>
      <div>
        <img src={image} alt='' />
      </div>
    </div>
  );
}

export default Card;
